from pytm import TM, Process, Dataflow, Datastore, Boundary

tm = TM("My GitHub App Threat Model")

# Example components
user = Process("User")
web = Process("Web App")
db = Datastore("Database")
boundary = Boundary("Internet")

df1 = Dataflow(user, web, "HTTP Request")
df2 = Dataflow(web, db, "SQL Query")

tm.process()
