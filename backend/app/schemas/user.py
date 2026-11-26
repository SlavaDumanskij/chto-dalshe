from datetime import datetime
from typing import List,Optional
from pydantic import BaseModel,ConfigDict,Field
from app.schemas.activity import ActivityResponse,CategoryResponse

class UserInterestsUpdate(BaseModel):
    category_ids:List[int]=Field(default_factory=list)

class UserInterestsResponse(BaseModel):
    interests:List[CategoryResponse]

class SearchParamsSchema(BaseModel):
    category_ids:Optional[List[int]]=None
    duration_min:Optional[int]=Field(default=None,ge=0)
    budget_level:Optional[int]=Field(default=None,ge=0)
    is_outdoor:Optional[bool]=None

class FavoriteCreate(BaseModel):
    activity_id:int

class FavoriteResponse(BaseModel):
    model_config=ConfigDict(from_attributes=True)
    id:int
    activity_id:int
    created_at:datetime
    activity:ActivityResponse
