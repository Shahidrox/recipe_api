## API
Type|method|API | Params
-|-|-|-
Create recipe|<img src="https://raw.githubusercontent.com/Shahidrox/icone/main/post.png" width="50" height="20">|```/recipes```|```{  "title": "string",  "making_time": "string",  "serves": "string",  "ingredients": "string",  "cost": 0}```
Get list of recipes|<img src="https://raw.githubusercontent.com/Shahidrox/icone/main/get.png" width="50" height="20">|```/recipes```|```-```
Find recipes by ID|<img src="https://raw.githubusercontent.com/Shahidrox/icone/main/get.png" width="50" height="20">|```/recipes/{id}```|```-```
Update recipes by ID|<img src="https://raw.githubusercontent.com/Shahidrox/icone/main/patch.png" width="50" height="20">|```/recipes/{id}```|```{ "title": "string",  "making_time": "string",  "serves": "string",  "ingredients": "string",  "cost": 0}```
Delete recipe| <img src="https://raw.githubusercontent.com/Shahidrox/icone/main/delete.png" width="50" height="20">|```/recipes/{id}```|```-```