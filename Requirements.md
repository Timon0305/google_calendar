# Requirements for Google -apis interface. 

We'll going to create one node.js component for each part of the google api. 

## Calendar. 

Calendar/router 
Calendar/Google.calendar.js 


1) Login to google apis /login 
2) get all the calendars in google calendar. Route /CalendarsGet
3) Get all the event of one calendar /eventsGet?calendar=id
4) get all event of all calendars between period. /getevents?from=dateini&to=datefin
5) Create a new calendar /calendarNew?name=myname.
6) Delete a calendar /calendarDelete?calendar=id
7) CreateEvent /eventCreate?date=mydate&title=mytitle&..... all the parametera the a event could place. 
8) Delete events /eventDelete?events=[id's array of events to delete] 


## Contacts 

Same as calendar. 
Login / List / delete / create of contacts


## emails 
Same as calendar 

10) Send email (funcionality to send a email with attached files. )
11) Funcionality to read all the new emails. 
12) way to set and unread email to read email. 
