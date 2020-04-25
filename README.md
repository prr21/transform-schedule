# transform-schedule

Write a separe script that calls:
http://api.dev.cakeiteasy.no/api/store/bakeries/test-bakery-pay-in-store/?country=NO

And transforms schedule in the response

Into array of strings in the format:
For {dayNameStart} - {dayNameEnd}: before {order_before}, {days_before_order}
day(s) before
Ex.
For monday-friday: Before 13:00, 1 day before

So the main challenge: group similar days: don’t show schedule for each day if a previous
day has the same rules. So in the screenshot above Monday-Friday is the same, Saturday and Sunday is different
For day offs please use format
{dayName}: closed

Test with other bakeries from the list available via
http://api.dev.cakeiteasy.no/api/store/bakeries/?country_code=no