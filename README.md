<<<<<< This app is all about to mamange the attendance system , It is basic CRUD operation >>>>>>
 There are 2 apis and for the validation i have used JOI package , so it will throw and error if user will any wrong key in payload or Datatype is different

1 => Mark Attendance ( Add the book in database)
    VALIDATION =  user_id,user_name,attendance_date are reuqired

    ** CURL ** 
    curl --location 'localhost:3000/attendance' \
    --header 'Content-Type: application/json' \
    --data '{
        "user_id":1,
        "user_name":"abhishek",
        "attendance_type":"present",
        "attendance_date":"2023-11-21"
    }'

2 => Get attendance records 
    VALIDATION =>  You can fetch the data user wise or attendance date wise

    ** CURL ** 
    curl --location 'localhost:3000/attendance?attendance_date=2023-11-21'
    || or ||
    curl --location 'localhost:3000/attendance?user_id=1'
