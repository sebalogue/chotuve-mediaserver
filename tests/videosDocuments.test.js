const VideosDocuments = require('../services/videosDocuments');
const DbFileNotFoundError = require('../services/errors/dbFileNotFoundError');

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

  test('Deleting video added returns true and then .exists() returns false', async () => {
    expect.assertions(3);
    const videoId = 123;
    const url = 'url_test.com';
    const metadata = {
      name: 'test_name',
      size: 80
    }
    const added = await videos.add(videoId, url, metadata);
    expect(added).toBe(true);

    const deleted = await videos.delete(videoId);
    expect(deleted).toBe(true);

    const exists = await videos.exists(videoId);
    expect(exists).toBe(false);
  });

test('Deleting video not added throws DbFileNotFoundError', async () => {
    //expect.assertions(2);
    const videoId = 123;
    const url = 'url_test.com';
    const metadata = {
      name: 'test_name',
      size: 80
    }
    const added = await videos.add(videoId, url, metadata);
    expect(added).toBe(true);

    const newVideoId = 124;
    expect(async () => {
      await videos.delete(newVideoId);
    }).rejects.toThrow(DbFileNotFoundError);
  });

test('Deleting video not added does not delete other videos', async () => {
    //expect.assertions(3);
    const videoId = 123;
    const url = 'url_test.com';
    const metadata = {
      name: 'test_name',
      size: 80
    }
    const added = await videos.add(videoId, url, metadata);
    expect(added).toBe(true);

    const newVideoId = 124;
    expect(async () => {
      await videos.delete(newVideoId);
    }).rejects.toThrow(DbFileNotFoundError);

    const exists = await videos.exists(videoId);
    expect(exists).toBe(true);
  });

  test('Getting url of video added returns its url', async () => {
    const videoId = 123;
    const url = 'url_test.com';
    const metadata = {
      name: 'test_name',
      size: 80
    }
    const added = await videos.add(videoId, url, metadata);
    expect(added).toBe(true);

    const ret_url = await videos.getUrl(videoId);
    expect(ret_url).toBe(url);
  })
});
