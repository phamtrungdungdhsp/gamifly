db = db.getSiblingDB('admin');
db.auth('root', 'password');
db = db.getSiblingDB('payment');
db.createUser({
  'user': 'user',
  'pwd': 'abcd1234',
  'roles': [{
    'role': 'readWrite',
    'db': 'payment'
  }]
});