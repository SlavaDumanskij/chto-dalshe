import uuid
from datetime import datetime
from sqlalchemy import Column,String,Text,Integer,Boolean,DateTime,ForeignKey,Table
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.core.database import Base

user_interests=Table(
    "user_interests",
    Base.metadata,
    Column("user_id",UUID(as_uuid=True),ForeignKey("users.id",ondelete="CASCADE"),primary_key=True),
    Column("category_id",Integer,ForeignKey("categories.id",ondelete="CASCADE"),primary_key=True)
)

class User(Base):
    __tablename__="users"
    id=Column(UUID(as_uuid=True),primary_key=True,default=uuid.uuid4)
    device_id=Column(String(255),unique=True,nullable=True,index=True)
    created_at=Column(DateTime,default=datetime.utcnow,nullable=False)
    favorites=relationship("Favorite",back_populates="user",cascade="all, delete-orphan")
    recommendations=relationship("RecommendationHistory",back_populates="user",cascade="all, delete-orphan")
    interests=relationship("Category",secondary=user_interests,back_populates="interested_users")

class Category(Base):
    __tablename__="categories"
    id=Column(Integer,primary_key=True,autoincrement=True)
    name=Column(String(100),unique=True,nullable=False)
    description=Column(Text,nullable=True)
    activities=relationship("Activity",back_populates="category")
    interested_users=relationship("User",secondary=user_interests,back_populates="interests")

class Activity(Base):
    __tablename__="activities"
    id=Column(Integer,primary_key=True,autoincrement=True)
    title=Column(String(255),nullable=False,index=True)
    description=Column(Text,nullable=False)
    category_id=Column(Integer,ForeignKey("categories.id",ondelete="RESTRICT"),nullable=False)
    duration_min=Column(Integer,nullable=True)
    budget_level=Column(Integer,default=0,nullable=False)
    is_outdoor=Column(Boolean,default=False,nullable=False)
    created_at=Column(DateTime,default=datetime.utcnow,nullable=False)
    category=relationship("Category",back_populates="activities")
    favorites=relationship("Favorite",back_populates="activity",cascade="all, delete-orphan")
    recommendations=relationship("RecommendationHistory",back_populates="activity",cascade="all, delete-orphan")

class Favorite(Base):
    __tablename__="favorites"
    id=Column(Integer,primary_key=True,autoincrement=True)
    user_id=Column(UUID(as_uuid=True),ForeignKey("users.id",ondelete="CASCADE"),nullable=False,index=True)
    activity_id=Column(Integer,ForeignKey("activities.id",ondelete="CASCADE"),nullable=False)
    created_at=Column(DateTime,default=datetime.utcnow,nullable=False)
    user=relationship("User",back_populates="favorites")
    activity=relationship("Activity",back_populates="favorites")

class RecommendationHistory(Base):
    __tablename__="recommendation_history"
    id=Column(Integer,primary_key=True,autoincrement=True)
    user_id=Column(UUID(as_uuid=True),ForeignKey("users.id",ondelete="CASCADE"),nullable=False,index=True)
    activity_id=Column(Integer,ForeignKey("activities.id",ondelete="CASCADE"),nullable=False)
    action=Column(String(50),default="shown",nullable=False)
    created_at=Column(DateTime,default=datetime.utcnow,nullable=False)
    user=relationship("User",back_populates="recommendations")
    activity=relationship("Activity",back_populates="recommendations")
