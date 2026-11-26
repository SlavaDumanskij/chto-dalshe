import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.database import Base,get_db
from app.main import app
from app.models.models import Activity,Category

TEST_DATABASE_URL="sqlite:///./test_users.db"
engine=create_engine(TEST_DATABASE_URL,connect_args={"check_same_thread":False})
TestingSessionLocal=sessionmaker(autocommit=False,autoflush=False,bind=engine)

def override_get_db():
    db=TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

@pytest.fixture(autouse=True)
def setup_db():
    app.dependency_overrides[get_db]=override_get_db
    Base.metadata.create_all(bind=engine)
    db=TestingSessionLocal()
    cat1=Category(name="Спорт",description="Активный отдых")
    cat2=Category(name="Кино",description="Просмотр фильмов")
    db.add_all([cat1,cat2])
    db.commit()
    db.refresh(cat1)
    db.refresh(cat2)

    act1=Activity(
        title="Пробежка в парке",
        description="Утренняя пробежка",
        category_id=cat1.id,
        duration_min=45,
        budget_level=0,
        is_outdoor=True,
    )
    act2=Activity(
        title="Вечерний киносеанс",
        description="Поход в кинотеатр",
        category_id=cat2.id,
        duration_min=120,
        budget_level=2,
        is_outdoor=False,
    )
    db.add_all([act1,act2])
    db.commit()
    db.close()
    yield
    Base.metadata.drop_all(bind=engine)

client=TestClient(app)
HEADERS={"X-Device-ID":"test-device-123"}

def test_user_interests_get_and_update():
    resp_empty=client.get("/users/me/interests",headers=HEADERS)
    assert resp_empty.status_code==200
    assert resp_empty.json()=={"interests":[]}

    resp_put=client.put("/users/me/interests",json={"category_ids":[1,2,1]},headers=HEADERS)
    assert resp_put.status_code==200
    data=resp_put.json()["interests"]
    assert len(data)==2
    assert {item["name"] for item in data}=={"Спорт","Кино"}

    resp_get=client.get("/users/me/interests",headers=HEADERS)
    assert resp_get.status_code==200
    assert len(resp_get.json()["interests"])==2

def test_user_interests_invalid_category():
    resp=client.put("/users/me/interests",json={"category_ids":[999]},headers=HEADERS)
    assert resp.status_code==404

def test_last_search_params_save_and_get():
    resp_init=client.get("/users/me/search-params",headers=HEADERS)
    assert resp_init.status_code==200
    assert resp_init.json() is None

    payload={
        "category_ids":[1],
        "duration_min":60,
        "budget_level":1,
        "is_outdoor":True,
    }
    resp_put=client.put("/users/me/search-params",json=payload,headers=HEADERS)
    assert resp_put.status_code==200
    assert resp_put.json()==payload

    resp_get=client.get("/users/me/search-params",headers=HEADERS)
    assert resp_get.status_code==200
    assert resp_get.json()==payload

def test_favorites_add_no_duplicates_and_delete():
    resp_add1=client.post("/users/me/favorites",json={"activity_id":1},headers=HEADERS)
    assert resp_add1.status_code==201
    fav_id=resp_add1.json()["id"]
    assert resp_add1.json()["activity"]["title"]=="Пробежка в парке"

    resp_add_dup=client.post("/users/me/favorites",json={"activity_id":1},headers=HEADERS)
    assert resp_add_dup.status_code==201
    assert resp_add_dup.json()["id"]==fav_id

    resp_list=client.get("/users/me/favorites",headers=HEADERS)
    assert resp_list.status_code==200
    assert len(resp_list.json())==1

    resp_del=client.delete("/users/me/favorites/1",headers=HEADERS)
    assert resp_del.status_code==204

    resp_list_after=client.get("/users/me/favorites",headers=HEADERS)
    assert resp_list_after.status_code==200
    assert resp_list_after.json()==[]

def test_favorites_404_cases():
    resp_add_missing=client.post("/users/me/favorites",json={"activity_id":999},headers=HEADERS)
    assert resp_add_missing.status_code==404

    resp_del_missing=client.delete("/users/me/favorites/1",headers=HEADERS)
    assert resp_del_missing.status_code==404

def test_missing_device_id_header():
    resp=client.get("/users/me/interests")
    assert resp.status_code==422
