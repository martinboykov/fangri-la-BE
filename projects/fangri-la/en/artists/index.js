const express = require('express');

const router = express.Router();

const data = require('./data');

const delay = require('../../delay');

const time = function () {
  return delay[Math.floor(Math.random() * delay.length)];
};

const db = require('../db');
const { items } = require('joi/lib/types/array');
const { putPassword } = require('../auth');

const artistItemList = db.artists.map((item, index) => ({
  id: item.id,
  name: item.name,
  image: item.image,
}));
const artists = db.artists;

const getArtists = (req, res, next) => {
  console.log('getArtists req.body: ', { ...req.body });
  console.log('getArtists req.params: ', { ...req.params });
  console.log('getArtists req.query: ', { ...req.query });
  const page = req.query.page;
  const itemsPerPage = 50;
  const firstPage = (+page - 1) * itemsPerPage;
  setTimeout(() => {
    return res.status(200).json({
      data: {
        items: artistItemList.slice(firstPage, firstPage + 10),
        hasNextPage: artistItemList.length > firstPage + 10,
      },
    });
  }, time());
  // return res.status(400).json({
  //   message: {
  //     title: 'Грешна парола или имейл адрес.',
  //     subtitle: 'Моля, опитайте пак или се свържете с администратор.',
  //   },
  // });
};
const getArtist = (req, res, next) => {
  console.log('getArtist req.body: ', { ...req.body });
  console.log('getArtist req.params: ', { ...req.params });
  console.log('getArtist req.query: ', { ...req.query });
  const id = req.params.id;
  const artist = artists.find((item) => item.id === id);
  console.log('🚀 ~ getArtist ~ artist:', artist);
  setTimeout(() => {
    return res.status(200).json({
      data: {
        ...artist,
        content: {
          items: artist.content.items.slice(0, 10),
          hasNextPage: artist.content.items.length > 10,
        },
      },
    });
  }, time());
  // return res.status(400).json({
  //   message: {
  //     title: 'Грешна парола или имейл адрес.',
  //     subtitle: 'Моля, опитайте пак или се свържете с администратор.',
  //   },
  // });
};

const getContentItems = (req, res, next) => {
  console.log('getContentItems req.body: ', { ...req.body });
  console.log('getContentItems req.params: ', { ...req.params });
  console.log('getContentItems req.query: ', { ...req.query });
  const artistId = req.params.id;
  const page = req.query.page;
  const itemsPerPage = 10;
  const currentPage = (+page - 1) * itemsPerPage;

  let contentList = db.artists
    .filter((artist) => artist.id === artistId)
    .map((artist, index) => artist.content.items);
  contentList = contentList[0];
  console.log('🚀 ~ getContentItems ~ contentList:', contentList);
  setTimeout(() => {
    return res.status(200).json({
      data: {
        items: contentList.slice(currentPage, currentPage + itemsPerPage),
        hasNextPage: contentList.length > currentPage + itemsPerPage,
      },
    });
  }, time());
  // return res.status(400).json({
  //   message: {
  //     title: 'Грешна парола или имейл адрес.',
  //     subtitle: 'Моля, опитайте пак или се свържете с администратор.',
  //   },
  // });
};
const getContentItemById = (req, res, next) => {
  console.log('getContentItemById req.body: ', { ...req.body });
  console.log('getContentItemById req.params: ', { ...req.params });
  console.log('getContentItemById req.query: ', { ...req.query });
  const artistId = req.params.id;
  const contentId = req.params.contentId;

  let contentList = db.artists
    .filter((artist) => artist.id === artistId)
    .map((artist, index) => artist.content.items);
  contentList = contentList[0];
  const content = contentList.find((item) => item.id === contentId);
  console.log('🚀 ~ getContentItemById ~ content:', content);
  setTimeout(() => {
    return res.status(200).json({
      data: content,
    });
  }, time());
  // return res.status(400).json({
  //   message: {
  //     title: 'Грешна парола или имейл адрес.',
  //     subtitle: 'Моля, опитайте пак или се свържете с администратор.',
  //   },
  // });
};
const getContentLikes = (req, res, next) => {
  console.log('getContentLikes req.body: ', { ...req.body });
  console.log('getContentLikes req.params: ', { ...req.params });
  console.log('getContentLikes req.query: ', { ...req.query });
  const artistId = req.params.id;
  const page = req.query.page;
  const itemsPerPage = 10;
  const currentPage = (+page - 1) * itemsPerPage;

  let likesList = db.artists
    .filter((artist) => artist.id === artistId)
    .map((artist, index) => artist.content.items);
  likesList = likesList[0].map((item, index) => {
    return {
      id: item.id,
      likes: item.likes,
    };
  });

  console.log('🚀 ~ getContentLikes ~ likesList:', likesList);
  setTimeout(() => {
    return res.status(200).json({
      data: likesList.slice(currentPage, currentPage + itemsPerPage),
    });
  }, time());
  // return res.status(400).json({
  //   message: {
  //     title: 'Грешна парола или имейл адрес.',
  //     subtitle: 'Моля, опитайте пак или се свържете с администратор.',
  //   },
  // });
};
let isLiked = true;
const putIncreaseLikes = (req, res, next) => {
  console.log('putIncreaseLikes req.body: ', { ...req.body });
  console.log('putIncreaseLikes req.params: ', { ...req.params });
  console.log('putIncreaseLikes req.query: ', { ...req.query });

  setTimeout(() => {
    return res.status(200).json({
      message: 'Успешно променихте паролата и/или имейла си!',
      data: isLiked,
    });

  }, time());
  setTimeout(() => {
    isLiked = !isLiked;
  }, 1000);
  // return res.status(400).json({
  //   message: {
  //     title: 'Не може да харесаш свое съдържание.',
  //     subtitle: '',
  //   }
  // });
};
const putUpdateSocialLink = (req, res, next) => {
  console.log('putUpdateSocialLink req.body: ', { ...req.body });
  console.log('putUpdateSocialLink req.params: ', { ...req.params });
  console.log('putUpdateSocialLink req.query: ', { ...req.query });

  // setTimeout(() => {
  //   return res.status(200).json({
  //     message: 'Успешно променихте паролата и/или имейла си!',
  //   });
  // }, time());
  return res.status(400).json({
    message: {
      title: 'Грешна парола или имейл адрес.',
      subtitle: 'Моля, опитайте пак или се свържете с администратор.',
    },
  });
};
const postContent = (req, res, next) => {
  console.log('postContent req.body: ', { ...req.body });
  console.log('postContent req.params: ', { ...req.params });
  console.log('postContent req.query: ', { ...req.query });

  setTimeout(() => {
    return res.status(200).json({
      message: 'Успешно качихте ново съдържание!',
    });
  }, time() );
  // return res.status(400).json({
  //   message: {
  //     title: 'Грешна парола или имейл адрес.',
  //     subtitle: 'Моля, опитайте пак или се свържете с администратор.',
  //   },
  // });
};
const putContent = (req, res, next) => {
  console.log('putContent req.body: ', { ...req.body });
  console.log('putContent req.params: ', { ...req.params });
  console.log('putContent req.query: ', { ...req.query });

  setTimeout(() => {
    return res.status(200).json({
      message: 'Успешно качихте обновеното съдържание!',
    });
  }, time());
  // return res.status(400).json({
  //   message: {
  //     title: 'Грешна парола или имейл адрес.',
  //     subtitle: 'Моля, опитайте пак или се свържете с администратор.',
  //   },
  // });
};
const deleteContent = (req, res, next) => {
  console.log('putContent req.body: ', { ...req.body });
  console.log('putContent req.params: ', { ...req.params });
  console.log('putContent req.query: ', { ...req.query });

  setTimeout(() => {
    return res.status(200).json({
      message: 'Успешно качихте обновеното съдържание!',
    });
  }, time());
  // return res.status(400).json({
  //   message: {
  //     title: 'Грешна парола или имейл адрес.',
  //     subtitle: 'Моля, опитайте пак или се свържете с администратор.',
  //   },
  // });
};
module.exports = {
  getArtists,
  getArtist,
  getContentItems,
  getContentItemById,
  getContentLikes,
  putIncreaseLikes,
  putUpdateSocialLink,
  postContent,
  putContent,
  deleteContent
};
