import axios from 'axios';

const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJiZHUuZnN0ZWMucnUiLCJhdWQiOnsiMCI6ImFwaVJlYWRPbmx5IiwiMiI6ImFwaV9nZXQifSwiZXhwIjoxNjc4NzQxNDY2LCJpZCI6IjQ3IiwianRpIjoiZWZiN2M0N2I5NWZiNjBhZDA0NDA5ZTRmZDAwZTUxZWY3MWZjMmU1NDJiMGFkYmYxNjRiYWM1ZmNlMWY2NDU4OGY2ZmUwMGU2Y2Y3ZDJkZWQ4OTY4OTFiYWJjMjIwYzZkMGMyZjdjMDlmN2I5NGMwYWZiZmVjNjJkNjE5NzYyNzciLCJpYXQiOjE2Nzg3Mzk2NjZ9.5N9COb1mdf28Stg-ByzfSUNLPACS4hopH-scTdcNEsRiLQaCumBrGwOWsiW2jok6QgxoT133ke0-LnpnzGByjg'
export const api =  axios.create({
  headers: {
    Authorization: `Bearer ${token}`
  }
});



