from typing import Optional, List, Union
from pydantic import BaseModel

class createGroupData(BaseModel):
    ticket: Optional[str] = None
    name: str
    tag: Union[None, List[str]]
    types: Optional[int] = None
    maxiNum: Optional[int] = None
    restriction: Optional[int] = None
    picLink: Optional[str] = None
    description: Optional[str] = None
    memNum: Optional[int] = None
    owner: Optional[str] = None

class memberGroupData(BaseModel):
    pages: int