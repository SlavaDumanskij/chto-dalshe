import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.database import Base,get_db
from app.main import app
from app.models.models import Activity,Category

TEST_DATABASE_URL="sqlite:///./test.db"
engine=create_engine(TEST_DATABASE_URL,connect_args={"check_same_thread":False})
TestingSessionLocal=sessionmaker(autocommit=False,autoflush=False,bind=engine)

def override_get_db():
    db=TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db]=override_get_db

@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    db=TestingSessionLocal()
    cat=Category(name="ТестКатегория",description="Описание")
    db.add(cat)
    db.commit()
    db.refresh(cat)
    act=Activity(
        title="Тестовая активность",
        description="Описание активности",
        category_id=cat.id,
        duration_min=60,
        budget_level=1,
        is_outdoor=True
    )
    db.add(act)
    db.commit()
    db.close()
    yield
    Base.metadata.drop_all(bind=engine)

client=TestClient(app)

def test_get_activities_list():
    response=client.get("/activities")
    assert response.status_code==200
    data=response.json()
    assert isinstance(data,list)
    assert len(data)==1
    assert data[0]["title"]=="Тестовая активность"
    assert data[0]["category"]["name"]=="ТестКатегория"

def test_get_activity_by_id_success():
    response=client.get("/activities/1")
    assert response.status_code==200
    data=response.json()
    assert data["id"]==1
    assert data["title"]=="Тестовая активность"

def test_get_activity_by_id_404():
    response=client.get("/activities/9999")
    assert response.status_code==404
    assert response.json()["detail"]=="Activity with id 9999 not found"

def test_get_activity_by_id_not_found_zero():
    response=client.get("/activities/0")
    assert response.status_code==404
    assert response.json()["detail"]=="Activity with id 0 not found"
