module.exports = (err, req, res) => {
  let status = err.status || err.statusCode || 500;

  if (status < 400) {
    status = 500;
  }

  res.statusCode = status;

  const body = {
    status,
  };

  body.stack = err.stack;

  if (status >= 500) {
    console.error(err.stack);
    body.message = 'Server error';
    res.json(body);
    return;
  }

  body.message = err.message;

  if (err.code) {
    body.code = err.code;
  }
  if (err.name) {
    body.name = err.name;
  }
  if (err.type) {
    body.type = err.type;
  }

  res.json(body);
};
