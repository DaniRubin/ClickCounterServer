# ClickCounterServer
AutoFeedBack click counter server + database

## Routes

### POST /save_data
Gets click data by this format - 
{
  username -> username of the user who made the click

  time -> The time the click accured
  
  taskid -> The task number that the clicked accured
  
  section_click -> The name of the that clicked - 
  
  [
  
    #myModelX - The section of - "Another details" and X is the index clicked,
  
    code_solution - click on solution example,
  
    code_clue - click on code clue
  
  ] 

}