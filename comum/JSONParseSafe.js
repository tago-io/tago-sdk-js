function JSONParseSafe(jsonString, defaultValue = {}) {
  if (!jsonString) {
    return defaultValue;
  }

  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return defaultValue;
  }
}

module.exports = JSONParseSafe;
