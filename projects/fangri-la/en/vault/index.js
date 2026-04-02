const express = require('express');

const router = express.Router();

const db = require('../db');

const delay = require('../../delay');

const time = delay[Math.floor(Math.random() * delay.length)];

const allVaultItems = [
  ...(db.merchandiseData || [[]])[0].map((item, index) => ({
    ...item,
    name: item.name,
  })),
  ...(db.merchandiseData || [[]])[1].map((item, index) => ({
    ...item,
    name: item.name,
  })),
  ...(db.merchandiseData || [[]])[2].map((item, index) => ({
    ...item,
    name: item.name,
  })),
  ...(db.merchandiseData || [[]])[3].map((item, index) => ({
    ...item,
    name: item.name,
  })),
  ...(db.merchandiseData || [[]])[4].map((item, index) => ({
    ...item,
    name: item.name,
  })),
];

const getVaultItem = (req, res, next) => {
  console.log('getVaultItem req.body: ', { ...req.body });
  console.log('getVaultItem req.params: ', { ...req.params });
  console.log('getVaultItem req.query: ', { ...req.query });
  const id = req.params.id;
  setTimeout(
    () => {
      return res.status(200).json({
        data: {
          ...db.merchandiseData[0][0],
          title: db.merchandiseData[0][0].name,
          backgroundColor: '#ff00ff',
          isUsed: false,
          isOwner: false,
          shopifyProductId: '9289573761283',
          dropImage: '/assets/static/images/artists/caden_kane/caden_kane_1080x1350_6_Walking_with_Crew_at_Night_in_NYC.png',
        },
      });
    },
    delay[Math.floor(Math.random() * delay.length)],
  );
  // return res.status(400).json({
  //   message: {
  //     title: 'Грешна парола или имейл адрес.',
  //     subtitle: 'Моля, опитайте пак или се свържете с администратор.',
  //   },
  // });
};

const getVaultItems = (req, res, next) => {
  console.log('getVaultItems req.body: ', { ...req.body });
  console.log('getVaultItems req.params: ', { ...req.params });
  console.log('getVaultItems req.query: ', { ...req.query });
  const page = req.query.page;
  const itemsPerPage = 12;
  const firstPage = (+page - 1) * itemsPerPage;
  console.log('🚀 ~ getVaultItems :', [page, itemsPerPage, firstPage]);
  setTimeout(
    () => {
      return res.status(200).json({
        data: {
          items: allVaultItems.slice(firstPage, firstPage + itemsPerPage).map((item, index) => ({
            ...item,
            dropImage: '/assets/static/images/artists/caden_kane/caden_kane_1080x1350_6_Walking_with_Crew_at_Night_in_NYC.png'
          })),
          hasNextPage: allVaultItems.length > firstPage + itemsPerPage,
          totalCount: allVaultItems.length,
        },
      });
    },
    delay[Math.floor(Math.random() * delay.length)],
  );
  // return res.status(400).json({
  //   message: {
  //     title: 'Грешна парола или имейл адрес.',
  //     subtitle: 'Моля, опитайте пак или се свържете с администратор.',
  //   },
  // });
};

module.exports = {
  getVaultItem,
  getVaultItems,
};
