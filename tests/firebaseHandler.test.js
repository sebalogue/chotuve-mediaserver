const FirebaseHandler = require('../services/firebaseHandler')

test('Subir archivo a firebase storage devuelve true', async () => {
  const firebaseHandler = new FirebaseHandler;
  const filename = './tests/files/test_file.txt';
  const destName = 'for_tests/test_file.txt';
  const result = await firebaseHandler.uploadFile(filename, destName);
  firebaseHandler.closeConnection();
  expect(result).toBeTruthy();
});

test('Eliminar archivo subido a firebase storage devuelve true', async () => {
  expect.assertions(2);
  const firebaseHandler = new FirebaseHandler;
  const filename = './tests/files/test_file.txt';
  const destName = 'for_tests/test_file_to_delete.txt';
  const uploadResult = await firebaseHandler.uploadFile(filename, destName);
  expect(uploadResult).toBeTruthy();

  const bucket = 'chotuve-videos';
  const url = 'https://%(bucket)s.storage.googleapis.com/%(file)s' % {'bucket':bucket, 'file':destName};
  const result = await firebaseHandler.deleteVideo(destName);
  firebaseHandler.closeConnection();
  expect(result).toBeTruthy();
});
