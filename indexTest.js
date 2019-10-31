const testsContext = require.context('.', true, /__test$/);
 
testsContext.keys().forEach(testsContext);