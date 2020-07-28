const FirebaseHandler = require('../services/firebaseHandler');
const FirebaseFileNotFoundError = require('../services/errors/firebaseFileNotFoundError');

describe('FirebaseHandler', () => {
  let firebaseHandler;
  beforeEach(() => {
    firebaseHandler = new FirebaseHandler;
  });

  afterEach(() => {
    firebaseHandler.closeConnection();
  });

  test('Subir archivo a firebase storage devuelve true', async () => {
    const filename = './tests/files/test_file.txt';
    const destName = 'for_tests/test_file.txt';
    const result = await firebaseHandler.uploadFile(filename, destName);
    expect(result).toBeTruthy();
  });

  test('Eliminar archivo subido a firebase storage devuelve true', async () => {
    expect.assertions(2);
    const filename = './tests/files/test_file.txt';
    const destName = 'for_tests/test_file_to_delete.txt';
    const uploadResult = await firebaseHandler.uploadFile(filename, destName);
    expect(uploadResult).toBeTruthy();

    const result = await firebaseHandler.deleteVideo(destName);
    expect(result).toBeTruthy();
  });

test('Eliminar archivo no existente lanza NotFoundError', () => {
    const destName = 'not_found_file.txt';
    expect(async () => {
      await firebaseHandler.deleteVideo(destName);
    }).rejects.toThrow(FirebaseFileNotFoundError);
  });

  test('Obtener metadata de un archivo subido es exitoso', async () => {
    const filename = './tests/files/test_file.txt';
    const destName = 'for_tests/test_file.txt';
    const result = await firebaseHandler.uploadFile(filename, destName);
    expect(result).toBeTruthy();
    const url = 'for_tests/test_file.txt';
    const metadata = await firebaseHandler.getVideoMetadata(url);

    expect(metadata.name).toBe('for_tests/test_file.txt');
  });
});
