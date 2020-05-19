const VideosDocuments = require('../services/videosDocuments');

describe('VideosDocuemnts', () => {
  jest.setTimeout(30000);

  let videos;
  beforeEach(() => {
    videos = new VideosDocuments();
  });

  afterEach(async () => {
    await videos._dropDatabase();
  });

  afterAll(async () => {
    await videos.close();
  });

test('Adding video document to database returns true', async () => {
    const videoId = 123;
    const url = 'url_test.com';
    const metadata = {
      name: 'test_name',
      size: 80
    }
    const res = await videos.add(videoId, url, metadata);
    expect(res).toBe(true);
  });

test('Video exists when added to database', async () => {
    expect.assertions(2);
    const videoId = 123;
    const url = 'url_test.com';
    const metadata = {
      name: 'test_name',
      size: 80
    }
    const added = await videos.add(videoId, url, metadata);
    expect(added).toBe(true);

    const exists = await videos.exists(videoId);
    expect(exists).toBe(true);
  });

  test('Video does not exists if empty database', async() => {
    const videoId = 123;
    const res = await videos.exists(videoId);
    expect(res).toBe(false);
  });

  test('Video does not exists if not added to database', async() => {
    expect.assertions(2);
    const videoId = 123;
    const url = 'url_test.com';
    const metadata = {
      name: 'test_name',
      size: 80
    }
    const added = await videos.add(videoId, url, metadata);
    expect(added).toBe(true);

    const videoIdNotAdded = 1234;
    const res = await videos.exists(videoIdNotAdded);
    expect(res).toBe(false);
  });

});
