import axios from 'axios';

const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJiZHUuZnN0ZWMucnUiLCJhdWQiOnsiMCI6ImFwaVJlYWRPbmx5IiwiMiI6ImFwaV9nZXQifSwiZXhwIjoxNjc4NjE2MTI2LCJpZCI6IjQ3IiwianRpIjoiMWEzYWY3MWNlMDE0N2JiMjk4ZWFjZmNlZDNhZTcwZGM2NDFlOWI2ODMyMTk1Nzk5ZmRkYmE5ODM2ZWM1ZDY0Nzk3NDJlN2I1ZjVhOTFjNjNjMDM2ZjdjMDdiOTkwMTM1YjEzZmJmYmE3OTMzYzc2MjFlNDAwYzdhMjYyZGM1OGQiLCJpYXQiOjE2Nzg2MTQzMjZ9.EXTsRd7q98rw-atJfYSCLa5xuEE9nfRT6zetW-4Z2SN-M_kh3ORToXTTAR2ug-zK7RS7y6umt8t1EzFh2IkSqA'
export default axios.create({
  headers: {
    Authorization: `Bearer ${token}`
  }
});
