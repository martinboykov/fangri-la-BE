// const idGenerator = () => Math.random().toString(32).slice(2);
const idGeneratorFactory = function () {
  let currentId = 0; // Initial ID

  return function getNextId() {
    currentId++;
    return currentId.toString();
  };
};
const idGenerator = idGeneratorFactory();

const randomNumberRange = (min, max) => Math.floor(Math.random() * (max - min) + min);

const isoDateGenerator = function* (startIndex = 0) {
  let currentIndex = startIndex;
  const currentDate = new Date();

  while (true) {
    // Create a new date object starting from today's date
    let nextDate = new Date(currentDate);

    // Increment the date by the current index
    nextDate.setDate(currentDate.getDate() + currentIndex);

    // Yield the ISO string of the date
    yield nextDate.toISOString();

    // Increment the index for the next iteration
    currentIndex--;
  }
};

function getBool() {
  return Math.random() < 0.5;
}
const baseArtistData = [
  {
    id: '100001',
    chat: {
      channelId: '100001',
    },
    name: 'Sienna Solas',
    surname: 'Solas',
    shortName: 'SS',
    image: '/assets/static/images/artists/sienna_solas/profile.png',
    bio: `Atlanta-born Sienna Solas crafts smooth R&B, pop hooks, and hip-hop beats into stories of love, hustle, and self-discovery.`,
    website: '',
  },
  {
    id: '100002',
    chat: {
      channelId: '100002',
    }  ,
    name: 'Caden Kane',
    surname: 'Kane',
    shortName: 'CK',
    image: '/assets/static/images/artists/caden_kane/profile.png',
    bio: `Atlanta-born Caden Kane crafts smooth R&B, pop hooks, and hip-hop beats into stories of love, hustle, and self-discovery.`,
    website: '',
  },
  {
    id: '100003',
    chat: {
      channelId: '100003',
    }  ,
    name: 'Nyko Blaze',
    surname: 'Blaze',
    shortName: 'NB',
    image: '/assets/static/images/artists/nyko_blaze/profile.png',
    bio: `Atlanta-born Nyko Blaze crafts smooth R&B, pop hooks, and hip-hop beats into stories of love, hustle, and self-discovery.`,
    website: '',
  },
  {
    id: '100004',
    chat: {
      channelId: '100004',
    }  ,
    name: 'SevenBlock',
    surname: 'Block',
    shortName: 'SB',
    image: '/assets/static/images/artists/sevenblock/profile.png',
    bio: `Atlanta-born SevenBlock crafts smooth R&B, pop hooks, and hip-hop beats into stories of love, hustle, and self-discovery.`,
    website: '',
  },
  {
    id: '100005',
    chat: {
      channelId: '100005',
    }  ,
    name: 'Nyla Veil',
    surname: 'Veil',
    shortName: 'NV',
    image: '/assets/static/images/artists/nyla_veil/profile.png',
    bio: `Atlanta-born Nyla Veil crafts smooth R&B, pop hooks, and hip-hop beats into stories of love, hustle, and self-discovery.`,
    website: '',
  },
];

const imagesData = [
  [
    '/assets/static/images/artists/sienna_solas/sienna_solas_1080x566_1_Sienna_on_stage.png',
    '/assets/static/images/artists/sienna_solas/sienna_solas_1080x1350_2_Sienna_backstage_with_mic.png',
    {
      poster: '/assets/static/videos/sienna_solas/1.png',
      sources: [
        {
          src: '/assets/static/videos/sienna_solas/1.mp4',
          type: 'video/mp4',
        },
      ],
    },
    {
      poster: '/assets/static/videos/sienna_solas/2.png',
      sources: [
        {
          src: '/assets/static/videos/sienna_solas/2.mp4',
          type: 'video/mp4',
        },
      ],
    },
    [
      '/assets/static/images/artists/sienna_solas/sienna_solas_1080x566_3_Wide_crowd_shot.png',
      '/assets/static/images/artists/sienna_solas/sienna_solas_1080x1350_4_Studio_session.png',
      '/assets/static/images/artists/sienna_solas/sienna_solas_1080x1350_5_Sunset_reflection.png',
    ],
    {
      poster: '/assets/static/videos/sienna_solas/3.png',
      sources: [
        {
          src: '/assets/static/videos/sienna_solas/3.mp4',
          type: 'video/mp4',
        },
      ],
    },
    '/assets/static/images/artists/sienna_solas/sienna_solas_1080x566_6_candid_laughing_shot.png',
    '/assets/static/images/artists/sienna_solas/sienna_solas_1080x566_7_Glam_dressing_room_prep.png',
    [
      '/assets/static/images/artists/sienna_solas/carousel/carousel-1.png',
      '/assets/static/images/artists/sienna_solas/carousel/carousel-2.png',
      '/assets/static/images/artists/sienna_solas/carousel/carousel-3.png',
      '/assets/static/images/artists/sienna_solas/carousel/carousel-4.png',
    ],
    '/assets/static/images/artists/sienna_solas/sienna_solas_1080x1350_8_City_street_portrait.png',
    '/assets/static/images/artists/sienna_solas/sienna_solas_1080x1350_9_Spotlight_concert_shot_.png',
    {
      poster: '/assets/static/videos/sienna_solas/4.png',
      sources: [
        {
          src: '/assets/static/videos/sienna_solas/4.mp4',
          type: 'video/mp4',
        },
      ],
    },
    '/assets/static/images/artists/sienna_solas/sienna_solas_1080x566_10_Artistic_studio_close_up.png',
    '/assets/static/images/artists/sienna_solas/sienna_solas_1080x1350_11_Arena_selfie,_sequined_outfit,_massive_crowd.png',
    '/assets/static/images/artists/sienna_solas/sienna_solas_1080x1080_12_Backstage_glam_chair,_glitter_robe.png',
    '/assets/static/images/artists/sienna_solas/sienna_solas_1080x1080_13_Writing_on_acoustic_guitar,_cozy_room.png',
    '/assets/static/images/artists/sienna_solas/sienna_solas_1080x1080_14_Street_in_front_of_Brooklyn_Bridge,_straight_stare.png',
    '/assets/static/images/artists/sienna_solas/sienna_solas_1080x1080_15_Black_&_white,_walking_down_city_street.png',
    {
      poster: '/assets/static/videos/sienna_solas/5.png',
      sources: [
        {
          src: '/assets/static/videos/sienna_solas/5.mp4',
          type: 'video/mp4',
        },
      ],
    },
    '/assets/static/images/artists/sienna_solas/sienna_solas_1080x1080_16_Standing_in_studio,_hoodie_+_headphones.png',
    '/assets/static/images/artists/sienna_solas/sienna_solas_1080x1080_17_Close_up_in_studio,_smiling_at_the_mic.png',
    {
      poster: '/assets/static/videos/sienna_solas/6.png',
      sources: [
        {
          src: '/assets/static/videos/sienna_solas/6.mp4',
          type: 'video/mp4',
        },
      ],
    },
    '/assets/static/images/artists/sienna_solas/sienna_solas_1080x1080_18_Black_&_white,_reaching_for_fans_onstage.png',
    '/assets/static/images/artists/sienna_solas/sienna_solas_1080x1080_19_Glitter_stage_outfit,_power_pose_under_lights.png',
    '/assets/static/images/artists/sienna_solas/sienna_solas_1080x1080_20_Graffiti_wall,_leather_jacket_look.png',
  ],
  [
    {
      poster: '/assets/static/videos/caden_kane/1.png',
      sources: [
        {
          src: '/assets/static/videos/caden_kane/1.mp4',
          type: 'video/mp4',
        },
      ],
    },
    '/assets/static/images/artists/caden_kane/caden_kane_1080x1080_1_Studio_Mic_Black_&_White_Eyes_Closed.png',
    '/assets/static/images/artists/caden_kane/caden_kane_1080x1080_2_Pool_Float_with_Champagne.png',
    '/assets/static/images/artists/caden_kane/caden_kane_1080x1080_3_Red_Tracksuit_in_G-Wagon.png',
    {
      poster: '/assets/static/videos/caden_kane/2.png',
      sources: [
        {
          src: '/assets/static/videos/caden_kane/2.mp4',
          type: 'video/mp4',
        },
      ],
    },
    '/assets/static/images/artists/caden_kane/caden_kane_1800x566_4_Arena_Stage_Arms_Out_to_Crowd.png',
    '/assets/static/images/artists/caden_kane/caden_kane_1080x1350_5_Studio_Mic_Hands_Together_Prayer_Pose.png',
    {
      poster: '/assets/static/videos/caden_kane/3.png',
      sources: [
        {
          src: '/assets/static/videos/caden_kane/3.mp4',
          type: 'video/mp4',
        },
      ],
    },
    '/assets/static/images/artists/caden_kane/caden_kane_1080x1350_6_Walking_with_Crew_at_Night_in_NYC.png',
    '/assets/static/images/artists/caden_kane/caden_kane_1080x1350_7_Sneaker_Wall_Collection.png',
    '/assets/static/images/artists/caden_kane/caden_kane_1080x1350_8_Barbershop_Laughing_in_Chair.png',
    {
      poster: '/assets/static/videos/caden_kane/4.png',
      sources: [
        {
          src: '/assets/static/videos/caden_kane/4.mp4',
          type: 'video/mp4',
        },
      ],
    },
  ],
  [
    '/assets/static/images/artists/nyko_blaze/nyko_blaze_1080x1350_1_Studio_Selfie_black_hoodie_mic_chain.png',
    {
      poster: '/assets/static/videos/nyko_blaze/1.png',
      sources: [
        {
          src: '/assets/static/videos/nyko_blaze/1.mp4',
          type: 'video/mp4',
        },
      ],
    },
    '/assets/static/images/artists/nyko_blaze/nyko_blaze_1080x1350_2_Studio_Mirror_Selfie_flash_layered_chains.png',
    '/assets/static/images/artists/nyko_blaze/nyko_blaze_1080x1350_3_With_Engineer_mixing_board.png',
    '/assets/static/images/artists/nyko_blaze/nyko_blaze_1080x1350_4_Sitting_on_Blue_Bugatti_at_Neon_Gas_Station.png',
    '/assets/static/images/artists/nyko_blaze/nyko_blaze_1800x566_5_Backstage_with_Crew_headphones_on_friends_hyping_him_up.png',
    {
      poster: '/assets/static/videos/nyko_blaze/2.png',
      sources: [
        {
          src: '/assets/static/videos/nyko_blaze/2.mp4',
          type: 'video/mp4',
        },
      ],
    },
    {
      poster: '/assets/static/videos/nyko_blaze/3.png',
      sources: [
        {
          src: '/assets/static/videos/nyko_blaze/3.mp4',
          type: 'video/mp4',
        },
      ],
    },
    '/assets/static/images/artists/nyko_blaze/nyko_blaze_1800x566_6_Rooftop_Performance_purple_hoodie_city_skyline.png',
    '/assets/static/images/artists/nyko_blaze/nyko_blaze_1080x1080_7_Courtside_laughing_pointing_sitting_with_legend.png',
    '/assets/static/images/artists/nyko_blaze/nyko_blaze_1080x1080_8_Grammys_Table_serious_look_dressed_up.png',
    '/assets/static/images/artists/nyko_blaze/nyko_blaze_1080x1080_9_Giving_Back_handing_out_backpacks.png',
    '/assets/static/images/artists/nyko_blaze/nyko_blaze_1080x1080_10_Counting_Money_at_Kitchen_Table.png',
  ],
  [
    '/assets/static/images/artists/sevenblock/sevenblock_1080x1080_1_Boarding_the_plane.png',
    {
      poster: '/assets/static/videos/sevenblock/1.png',
      sources: [
        {
          src: '/assets/static/videos/sevenblock/1.mp4',
          type: 'video/mp4',
        },
      ],
    },
    '/assets/static/images/artists/sevenblock/sevenblock_1080x1080_2_Sneakers_Jordan_1s.png',
    '/assets/static/images/artists/sevenblock/sevenblock_1080x1080_3_Watch_&_tattoo_driving.png',
    {
      poster: '/assets/static/videos/sevenblock/2.png',
      sources: [
        {
          src: '/assets/static/videos/sevenblock/2.mp4',
          type: 'video/mp4',
        },
      ],
    },
    '/assets/static/images/artists/sevenblock/sevenblock_1800x566_4_Limo_with_crew.png',
    '/assets/static/images/artists/sevenblock/sevenblock_1080x1350_5_On_stage_arena_fire_behind.png',
    {
      poster: '/assets/static/videos/sevenblock/3.png',
      sources: [
        {
          src: '/assets/static/videos/sevenblock/3.mp4',
          type: 'video/mp4',
        },
      ],
    },
    '/assets/static/images/artists/sevenblock/sevenblock_1080x1350_6_Art_gallery_handshake.png',
    '/assets/static/images/artists/sevenblock/sevenblock_1080x1350_7_Leaning_on_car_neon_diner.png',
  ],
  [
    '/assets/static/images/artists/nyla_veil/nyla_veil_1800x566_1_Singing_in_the_shadows_close_up_with_retro_mic.png',
    '/assets/static/images/artists/nyla_veil/nyla_veil_1800x566_2_At_the_piano_thoughtful_reflection.png',
    '/assets/static/images/artists/nyla_veil/nyla_veil_1080x1080_3_FaceTime_with_a_fan_smiling.png',
    '/assets/static/images/artists/nyla_veil/nyla_veil_1080x1080_4_Getting_ready_in_the_makeup_chair.png',
    '/assets/static/images/artists/nyla_veil/nyla_veil_1080x1080_5_Neon_portrait_looking_serious.png',
    '/assets/static/images/artists/nyla_veil/nyla_veil_1080x1080_6_Recording_in_the_booth_black_&_white_singing_passionately.png',
    {
      poster: '/assets/static/videos/nyla_veil/1.png',
      sources: [
        {
          src: '/assets/static/videos/nyla_veil/1.mp4',
          type: 'video/mp4',
        },
      ],
    },
    '/assets/static/images/artists/nyla_veil/nyla_veil_1080x1350_7_Sipping_tea_by_the_window.png',
    '/assets/static/images/artists/nyla_veil/nyla_veil_1080x1350_8_Holding_a_vinyl_record.png',
    '/assets/static/images/artists/nyla_veil/nyla_veil_1080x1350_9_Color_block_coat_portrait.png',
    {
      poster: '/assets/static/videos/nyla_veil/2.png',
      sources: [
        {
          src: '/assets/static/videos/nyla_veil/2.mp4',
          type: 'video/mp4',
        },
      ],
    },
    '/assets/static/images/artists/nyla_veil/nyla_veil_1080x1350_10_Laughing_on_the_steps_with_iced_coffee.png',
    '/assets/static/images/artists/nyla_veil/nyla_veil_1080x1350_11_Beach_at_sunset_with_flowing_fabric.png',
  ],
];

const shortCaptionsData = [
  // Sienna Solas

  'The lights, the energy, the moment. Nothing compares to feeling the crowd sing it back. 💫',
  'This is where it starts — the quiet moments before the chaos, where I ground myself and remember why I do this. Every note, every lyric, it’s all about pouring my truth into the music. The stage is next.',
  'All love. All energy. All of you. ❤️',
  'There’s something sacred about being in the studio - experimenting with sounds, chasing that one harmony that gives you chills. This is where songs are born, where emotions take shape, and where the world outside fades until the music is all that matters.',
  'Finding clarity in golden hours. 🌅',
  'You can’t fake joy like this. Music is serious, the grind is real, but I always come back to laughter. It fuels me, heals me, and keeps me grounded when life tries to make me forget who I am.',
  'Transformation mode: ON. 💄✨',
  'I grew up with city sounds -  trains, sirens, late-night conversations on stoops. That rhythm has always been in me. Walking these streets, I’m reminded of where I came from, and how every song I write is rooted in that heartbeat.',
  'Lost in the spotlight. Found in the music. 🎶',
  'Music isn’t always bright lights and big crowds. Sometimes it’s raw, vulnerable, and painted in shades of shadow. I’ve learned to embrace that side of me, because it’s real - and real is the only thing worth singing.',
  'All eyes, all lights. ✨',
  'Backstage rituals. The calm before the chaos, the sparkle before the storm. Every detail matters before stepping out there.',
  'Some stages are arenas, others are quiet corners. This is where the stories start - before they ever find a beat.',
  'Concrete truths.',
  'Streets change, faces pass, but the rhythm of the city keeps me grounded. Every step writes another line in my story.',
  'When the mic is on, the world fades. It’s just me, my voice, and a thousand feelings searching for the right words.',
  'Found my frequency.',
  'No walls, no distance.',
  'This is the roar, the shine, the moment you dream about when nobody’s watching. And I’m living it.',
  'Edge in every glance.',
  'Every note, every lyric, it’s all about pouring my truth into the music. The stage is next.',

  // caden kane
  [
    'Every bar, every verse - it’s all real. No filters, no gimmicks. Just truth in the booth.',
    'From the block to the rooftop - never forget where you came from, but don’t be afraid to toast to where you’re going.',
    'They doubted every move, laughed at every setback, counted me out every chance they had. Now I’m pushing foreigns, still hungry like day one. Success don’t change the grind, it just raises the stakes.',
    'This energy? Can’t buy it. Can’t fake it. It’s love.',
    'Not every day is bright, not every story is easy to tell. But the booth don’t judge - it listens. I step in here with gratitude, knowing my voice can change someone else’s darkest day. That’s the real blessing.',
    'Move smart, move solid, move with your day ones. Loyalty ain’t for sale.',
    'Every pair got a story. Every grind got a reward.',
    'Success don’t change the vibe. I’ll always be that kid who sat in the chair, laughing with my people, talking dreams while the clippers buzz. Ain’t nothing better than staying grounded while you rise.',
  ],

  // nyko blaze
  [
    'Studio is my second home. Every track, every verse, built right here.',
    'Reflecting on the grind, shining through the struggle.',
    'The artist holds the mic, but it’s the crew that brings the sound to life. Grateful for the engineers, producers, and writers that sharpen the vision. Teamwork turns raw energy into timeless records.',
    'This ain’t just flexing - it’s proof. Proof that hard work, vision, and faith can take you from corner store dreams to neon-lit nights in foreign rides. Still me, just moving different.',
    'Vibes are different when your team believes in you as much as you do.',
    'Skyline sessions. Just me, the city, and the music.',
    'Dreams courtside. From hooping on blacktops to sitting with icons.',
    'I remember scribbling verses on the back of receipts, dreaming about this moment. Now I’m in the room, where the lights are bright and the gold is real. Blessed, humbled, but still hungry for more.',
    'Always give back. The future starts with them.',
    'Paper’s cool, but it’s what you do with it that matters. Every stack here is proof of the nights I stayed grinding when the world slept. Respect the hustle, respect the discipline.',
  ],
  [
    // Nyla Veil
    'Sometimes the truest notes are born in the dark.',
    'My piano knows all my secrets.',
    'I’ll never stop being grateful for the love. Every message, every call, every moment I get to connect with you reminds me why I started this journey in the first place. You’re family.',
    'Before the spotlight hits, there’s a moment of calm.',
    'The city moves fast, the colors blur, but music slows it all down for me. No matter how chaotic it gets, the songs always lead me back to myself.',
    'Every lyric is a piece of me.',
    'Some days are made for silence. Just me, a warm cup, and the sound of rain painting stories on the glass. Inspiration doesn’t always come from chaos - sometimes it whispers.',
    'The music feels different when it spins.',
    'Art isn’t just what I make - it’s what I wear.',
    'Music is serious, life is deep - but don’t get it twisted, I love to laugh. These little moments, sunshine and good energy, are the fuel that keeps the music alive.',
    'Where the ocean meets the soul.',
  ],
  [
    // SevenBlock
    'New city, same hustle ✈️',
    'Fresh kicks, fresh moves 👟🔥',
    'The watch don’t lie. Every second is another chance to prove the block raised me right.',
    'Block strong. Always.',
    'St. Louis raised me for this moment. Every verse, every fire, every fan — it’s all part of the story.',
    'Respect moves louder than words.',
    'Night shift vibes.',
  ],
];

const linksData = [
  {
    music: [
      {
        id: 1,
        platform: 'spotify',
        img: '/assets/images/social/spotify.png',
        url: 'https://open.spotify.com/artist/1',
      },
      {
        id: 2,
        platform: 'apple_music',
        img: '/assets/images/social/apple_music.png',
        url: 'https://music.apple.com/us/artist/novarae/145567901',
      },
    ],
    socials: [
      {
        id: 1,
        platform: 'instagram',
        img: '/assets/images/social/instagram.png',
        url: 'https://instagram.com/novarae',
      },
      {
        id: 2,
        platform: 'x',
        img: '/assets/images/social/x.png',
        url: 'https://twitter.com/novarae',
      },
      {
        id: 3,
        platform: 'tiktok',
        img: '/assets/images/social/tiktok.png',
        url: 'https://www.tiktok.com/@novarae',
      },
      {
        id: 4,
        platform: 'youtube',
        img: '/assets/images/social/youtube.png',
        url: 'https://www.youtube.com/@novarae',
      },
      {
        id: 5,
        platform: 'facebook',
        img: '/assets/images/social/facebook.png',
        url: 'https://facebook.com/novarae',
      },
    ],
    shows: [
      {
        id: 1,
        platform: 'bandsintown',
        img: '/assets/images/social/bandsintown.png',
        url: 'https://www.bandsintown.com/a/14146697-novara?came_from=257&utm_medium=web&utm_source=home&utm_campaign=search_bar',
      },
      {
        id: 2,
        platform: 'songkick',
        img: '/assets/images/social/songkick.png',
        url: 'https://www.songkick.com/artists/8966304-novara',
      },
    ],
  },
  {
    music: [
      {
        id: 1,
        platform: 'spotify',
        img: '/assets/images/social/spotify.png',
        url: 'https://open.spotify.com/artist/1',
      },
      {
        id: 2,
        platform: 'apple_music',
        img: '/assets/images/social/apple_music.png',
        url: 'https://music.apple.com/us/artist/novarae/145567901',
      },
    ],
    socials: [
      {
        id: 1,
        platform: 'instagram',
        img: '/assets/images/social/instagram.png',
        url: 'https://instagram.com/novarae',
      },
      {
        id: 2,
        platform: 'x',
        img: '/assets/images/social/x.png',
        url: 'https://twitter.com/novarae',
      },
      {
        id: 3,
        platform: 'tiktok',
        img: '/assets/images/social/tiktok.png',
        url: 'https://www.tiktok.com/@novarae',
      },
      {
        id: 4,
        platform: 'youtube',
        img: '/assets/images/social/youtube.png',
        url: 'https://www.youtube.com/@novarae',
      },
      {
        id: 5,
        platform: 'facebook',
        img: '/assets/images/social/facebook.png',
        url: 'https://facebook.com/novarae',
      },
    ],
    shows: [
      {
        id: 1,
        platform: 'bandsintown',
        img: '/assets/images/social/bandsintown.png',
        url: 'https://www.bandsintown.com/a/14146697-novara?came_from=257&utm_medium=web&utm_source=home&utm_campaign=search_bar',
      },
      {
        id: 2,
        platform: 'songkick',
        img: '/assets/images/social/songkick.png',
        url: 'https://www.songkick.com/artists/8966304-novara',
      },
    ],
  },
  {
    music: [
      {
        id: 1,
        platform: 'spotify',
        img: '/assets/images/social/spotify.png',
        url: 'https://open.spotify.com/artist/1',
      },
      // {
      //   id: 2,
      //   platform: 'apple_music',
      //   img: '/assets/images/social/apple_music.png',
      //   url: 'https://music.apple.com/us/artist/novarae/145567901',
      // },
    ],
    socials: [
      {
        id: 1,
        platform: 'instagram',
        img: '/assets/images/social/instagram.png',
        url: 'https://instagram.com/novarae',
      },
      // {
      //   id: 2,
      //   platform: 'x',
      //   img: '/assets/images/social/x.png',
      //   url: 'https://twitter.com/novarae',
      // },
      {
        id: 3,
        platform: 'tiktok',
        img: '/assets/images/social/tiktok.png',
        url: 'https://www.tiktok.com/@novarae',
      },
      {
        id: 4,
        platform: 'youtube',
        img: '/assets/images/social/youtube.png',
        url: 'https://www.youtube.com/@novarae',
      },
      // {
      //   id: 5,
      //   platform: 'facebook',
      //   img: '/assets/images/social/facebook.png',
      //   url: 'https://facebook.com/novarae',
      // },
    ],
    shows: [
      // {
      //   id: 1,
      //   platform: 'bandsintown',
      //   img: '/assets/images/social/bandsintown.png',
      //   url: 'https://www.bandsintown.com/a/14146697-novara?came_from=257&utm_medium=web&utm_source=home&utm_campaign=search_bar',
      // },
      // {
      //   id: 2,
      //   platform: 'songkick',
      //   img: '/assets/images/social/songkick.png',
      //   url: 'https://www.songkick.com/artists/8966304-novara',
      // },
    ],
  },
  {
    music: [
      {
        id: 1,
        platform: 'spotify',
        img: '/assets/images/social/spotify.png',
        url: 'https://open.spotify.com/artist/1',
      },
      {
        id: 2,
        platform: 'apple_music',
        img: '/assets/images/social/apple_music.png',
        url: 'https://music.apple.com/us/artist/novarae/145567901',
      },
    ],
    socials: [
      {
        id: 1,
        platform: 'instagram',
        img: '/assets/images/social/instagram.png',
        url: 'https://instagram.com/novarae',
      },
      {
        id: 2,
        platform: 'x',
        img: '/assets/images/social/x.png',
        url: 'https://twitter.com/novarae',
      },
      {
        id: 3,
        platform: 'tiktok',
        img: '/assets/images/social/tiktok.png',
        url: 'https://www.tiktok.com/@novarae',
      },
      {
        id: 4,
        platform: 'youtube',
        img: '/assets/images/social/youtube.png',
        url: 'https://www.youtube.com/@novarae',
      },
      {
        id: 5,
        platform: 'facebook',
        img: '/assets/images/social/facebook.png',
        url: 'https://facebook.com/novarae',
      },
    ],
    shows: [
      {
        id: 1,
        platform: 'bandsintown',
        img: '/assets/images/social/bandsintown.png',
        url: 'https://www.bandsintown.com/a/14146697-novara?came_from=257&utm_medium=web&utm_source=home&utm_campaign=search_bar',
      },
      {
        id: 2,
        platform: 'songkick',
        img: '/assets/images/social/songkick.png',
        url: 'https://www.songkick.com/artists/8966304-novara',
      },
    ],
  },
  {
    music: [
      {
        id: 1,
        platform: 'spotify',
        img: '/assets/images/social/spotify.png',
        url: 'https://open.spotify.com/artist/1',
      },
      {
        id: 2,
        platform: 'apple_music',
        img: '/assets/images/social/apple_music.png',
        url: 'https://music.apple.com/us/artist/novarae/145567901',
      },
    ],
    socials: [
      {
        id: 1,
        platform: 'instagram',
        img: '/assets/images/social/instagram.png',
        url: 'https://instagram.com/novarae',
      },
      {
        id: 2,
        platform: 'x',
        img: '/assets/images/social/x.png',
        url: 'https://twitter.com/novarae',
      },
      {
        id: 3,
        platform: 'tiktok',
        img: '/assets/images/social/tiktok.png',
        url: 'https://www.tiktok.com/@novarae',
      },
      {
        id: 4,
        platform: 'youtube',
        img: '/assets/images/social/youtube.png',
        url: 'https://www.youtube.com/@novarae',
      },
      {
        id: 5,
        platform: 'facebook',
        img: '/assets/images/social/facebook.png',
        url: 'https://facebook.com/novarae',
      },
    ],
    shows: [
      {
        id: 1,
        platform: 'bandsintown',
        img: '/assets/images/social/bandsintown.png',
        url: 'https://www.bandsintown.com/a/14146697-novara?came_from=257&utm_medium=web&utm_source=home&utm_campaign=search_bar',
      },
      {
        id: 2,
        platform: 'songkick',
        img: '/assets/images/social/songkick.png',
        url: 'https://www.songkick.com/artists/8966304-novara',
      },
    ],
  },
];

let chatData = [
  [
    {
      name: 'sienna',
      message:
        'Be honest… what’s the first song of mine you’d play if you got the control of the radio in my car? 🚗🎶',
    },
    {
      name: 'fan',
      message: 'No lie, I’m putting on CTRL/ALT/DEL instantly 🔥',
    },
    {
      name: 'sienna',
      message: 'Just realized I write half my songs at 2AM. Night owls where you at? 🌙✍️',
    },
    {
      name: 'fan',
      message: 'Me toooo, 2AM is when the brain hits different 🤯',
    },
    {
      name: 'sienna',
      message:
        'Had a dream last night I was performing barefoot on a rooftop… might need to make that happen fr. 👣✨',
    },
    { name: 'fan', message: 'Yes pls. Rooftop show with city lights >>>' },
    {
      name: 'sienna',
      message:
        'What’s one lyric of mine that you screamed louder than your neighbors probably liked? 😂🎤',
    },
    {
      name: 'fan',
      message: '‘You said forever like a password you forgot’ – that line cuts deep every time 😭',
    },
    {
      name: 'sienna',
      message: 'Studio food of choice rn: hot fries + sparkling water. Don’t judge me. 😅🔥',
    },
    { name: 'fan', message: 'No judgment here, hot fries are elite 🔥🙌' },
    {
      name: 'sienna',
      message: 'If we dropped a surprise acoustic set in YOUR city, what venue should it be? 👀🏙️',
    },
    {
      name: 'fan',
      message: 'Come play at The Roxy in LA… it would be insane acoustic 😍',
    },
    {
      name: 'sienna',
      message:
        'High key wanna know: do y’all listen to my songs more when you’re happy or when you’re sad? 🖤💛',
    },
    { name: 'fan', message: 'Sad tbh. Your music makes me feel seen 🥺' },
    {
      name: 'sienna',
      message: 'Next track… more bass or more strings? Which vibe are you voting for? 🎸🎧',
    },
    { name: 'fan', message: 'Strings all day. Give me the feels 🎻' },
    {
      name: 'sienna',
      message:
        'My playlists are pure chaos - Frank Ocean then straight into Paramore then Bad Bunny. What’s YOUR wildest shuffle combo? 🔀😂',
    },
    {
      name: 'fan',
      message: 'Mine went Drake ➡️ Nirvana ➡️ Hannah Montana the other day 💀',
    },
    {
      name: 'sienna',
      message: 'Tour nights >>> everything. Who’s ready to lose their voice with me this fall? 🫶',
    },
    {
      name: 'fan',
      message: 'Already warming up my vocal cords lol. Can’t wait!! 🔥',
    },
  ],
  [
    {
      name: 'caden',
      message:
        'Hi, I’m Caden, your friendly neighborhood artist. What’s your favorite song of mine? 🎶',
    },
    {
      name: 'caden',
      message: 'First things first… y’all know I’m Philly born & raised. What city you reppin? 🏙️',
    },
    {
      name: 'fan',
      message: 'Cleveland in the house!! But Philly got my heart thanks to you 🔥',
    },
    {
      name: 'caden',
      message: 'If I’m not in the studio, I’m at the courts. 🏀 Who’s cooking me 1v1 tho?',
    },
    {
      name: 'fan',
      message: 'You don’t want this smoke 😂 I got a jumper like Curry',
    },
    {
      name: 'caden',
      message: 'Real talk - do you turn me up more in the gym or in the whip? 🚗💪',
    },
    {
      name: 'fan',
      message: 'Gym for sure. Your tracks keep me going that extra mile 💯',
    },
    {
      name: 'caden',
      message: 'What bar of mine hit you like a punch to the chest? 🥊',
    },
    {
      name: 'fan',
      message: '‘City on my back, I carry pain like luggage’ -  that one stays with me fr',
    },
    {
      name: 'caden',
      message: 'Wings debate rn: flats or drums? Don’t make me lose respect for you 😂🍗',
    },
    {
      name: 'fan',
      message: 'Flats all day, don’t even play with me lmao',
    },
    {
      name: 'caden',
      message:
        'Philly cheesesteak is top 3 meals ever, no debate. What’s YOUR ride-or-die meal? 🥖🔥',
    },
    {
      name: 'fan',
      message: 'Tacos. I could eat them every day and never get tired 🌮',
    },
  ],
  [
    {
      name: 'nyla',
      message:
        'I swear the ocean keeps secrets… do you feel more at peace near water or mountains? 🌊⛰️',
    },
    {
      name: 'fan',
      message: 'Always water. Something about the waves makes me feel like I can breathe again.',
    },
    {
      name: 'nyla',
      message: 'If the moon could whisper one word to you tonight, what do you hope it says? 🌙✨',
    },
    {
      name: 'fan',
      message: '‘You’re enough.’ That’s what I’d want to hear.',
    },
    {
      name: 'nyla',
      message:
        'My songs are like journals I decided not to hide. What’s something you’ve written down that still feels like magic when you read it back? 🖋️📖',
    },
    {
      name: 'fan',
      message:
        'A letter I wrote to myself when I was 16. It reminds me I survived everything I thought I couldn’t.',
    },
    {
      name: 'nyla',
      message:
        'Sometimes silence feels louder than words. Do you find peace in quiet or does it make you restless? 🤍',
    },
    {
      name: 'fan',
      message: 'Quiet is where I heal. It’s when I finally hear myself.',
    },
    {
      name: 'nyla',
      message:
        'I light a candle before I write, just to remind myself there’s beauty in small rituals. Do you have a ritual that grounds you? 🕯️',
    },
    {
      name: 'fan',
      message: 'Tea at night. One cup and I feel like my soul settles down.',
    },
  ],
  [
    {
      name: 'sevenblock',
      message: 'What’s heavier… the crown or the chains? 👑⛓️',
    },
    {
      name: 'fan',
      message: 'Chains. The crown you earn, but the chains you carry.',
    },
    {
      name: 'sevenblock',
      message: 'Every block got a story. What’s one lesson your city taught you? 🏙️',
    },
    {
      name: 'fan',
      message: 'Trust your gut and never move sloppy. Learned that the hard way.',
    },
    {
      name: 'sevenblock',
      message: 'When the lights cut off, who still ridin’ with you? 💡',
    },
    {
      name: 'fan',
      message: 'The circle got real small, but the ones left are solid.',
    },
    {
      name: 'sevenblock',
      message:
        'Some nights the studio feel like church. You ever find your peace in a place nobody else would? 🎤🙏',
    },
    {
      name: 'fan',
      message: 'Yeah… the gym at 2am. Just me and the weights. Feels holy.',
    },
    {
      name: 'sevenblock',
      message:
        'I don’t rap fairy tales. I rap survival. What track of mine hit you in the chest the hardest? 💥',
    },
    {
      name: 'fan',
      message: 'old Winter’ -  felt every word of that one.',
    },
    {
      name: 'sevenblock',
      message: 'Pressure make diamonds… or dust. Which one you turnin’ into? 💎',
    },
    {
      name: 'fan',
      message: 'Diamond. Been through too much not to shine.',
    },
    {
      name: 'sevenblock',
      message: 'Sometimes the ops ain’t outside… they in your head. How you fight yours? 🥊🧠',
    },
    {
      name: 'fan',
      message: 'Writing it down. Can’t fight the demons till I see ‘em clear.',
    },
    {
      name: 'sevenblock',
      message:
        'I came from nothin’. What’s one thing you promised yourself you’d never go back to? 🚫',
    },
    {
      name: 'fan',
      message: 'Sleeping on floors. I grind every day to make sure that ain’t my life again.',
    },
  ],
  [
    {
      name: 'nyko',
      message: 'Biggest flex ain’t the car, it’s the fact I ain’t who I used to be. 💯',
    },
    {
      name: 'fan',
      message: 'Facts. Glow-up hits harder when people know where you started.',
    },
    {
      name: 'nyko',
      message: 'If I pulled up with a surprise show tonight, what song y’all screaming first? 🎤🔥',
    },
    {
      name: 'fan',
      message: '‘No Sleep City’!! That track goes crazy live!',
    },
    {
      name: 'nyko',
      message: 'What’s louder — my engine or my bass line? 🏎️🔊',
    },
    {
      name: 'fan',
      message: 'Engine got the growl… but the bass shakes my whole apartment 😂',
    },
    {
      name: 'nyko',
      message: 'Luxury don’t mean nothin’ if your loyalty broke. You agree? 🤔',
    },
    {
      name: 'fan',
      message: '100%. Money comes and goes, loyalty is forever.',
    },
    {
      name: 'nyko',
      message: 'Some chase clout, I chase legacy. What are YOU chasing rn? 🚀',
    },
    {
      name: 'fan',
      message: 'Peace of mind. Everything else comes after that.',
    },
    {
      name: 'nyko',
      message:
        'Studio’s been crazy… should I leak a snippet here first or hold it till drop day? 👀',
    },
    {
      name: 'fan',
      message: 'Snippet!! Don’t play with us 😭🔥',
    },
  ],
];

const merchandiseData = [
  [
    {
      id: idGenerator(),
      artist: 'Sienna Solas',
      name: 'Before the Noise Virtual Vinyl™',
      images: [
        '/assets/static/images/merchandise/sienna_solas_1_before_the_noise_0.jpg',
        '/assets/static/images/merchandise/sienna_solas_1_before_the_noise_1.jpg',
        '/assets/static/images/merchandise/sienna_solas_1_before_the_noise_2.jpg',
      ],
      shortVideo: {
        poster: '/assets/static/videos/video_nfc.png',
        sources: [
          {
            src: '/assets/static/videos/video_nfc.mp4',
            type: 'video/mp4',
          },
        ],
      },
      longVideo: {
        poster: '/assets/static/videos/video_nfc.png',
        sources: [
          {
            src: '/assets/static/videos/video_nfc.mp4',
            type: 'video/mp4',
          },
        ],
      },
      price: 125,
      sku: 'SS-APP-001-CPS',
      description: `<p><span >In&nbsp;</span><em><span >Before the Noise</span></em><span >, Sienna Solas strips everything away &mdash; the glitter, the production, the pretense &mdash; until only her voice remains. Captured in an acoustically sealed white room, the album is a study in stillness and clarity. The Virtual Vinyl&trade; experience unlocks a raw studio film where Sienna performs each song live in the room where it was recorded, her breath and heartbeat becoming part of the rhythm.</span></p>
<p><br></p>`,
      totalCount: 2,
      tags: ['1 of 5000', 'Virtual Vinyl™', 'Digital Collectible'],
      labels: [
        {
          name: '1 of 5000',
          color: '#fff',
          background: '#4cc8bc',
        },
        // {
        //   name: 'Exclusive early access',
        //   color: '#111',
        //   background: '#fff7a1',
        // },
        {
          name: 'Virtual Vinyl™',
          color: '#fff',
          background: '#2c2e35',
        },
        {
          name: 'Digital Collectible',
          color: '#fff',
          background: '#2c2e35',
        },
      ],
      options: {
        // colors: ['#FFF7A1', '#A1FFAF', '#A1A6FF', '#FFA1EB', '#FFA1A3'],
        // sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      parameters: [
        {
          name: 'specifications',
          value: [
            `12-inch transparent white vinyl print`,
            `Digital Studio Session NFC Experience`,
            `Full lossless audio master + alternate acapellas`,
          ],
        },
        // {
        //   name: 'vinyl',
        //   value: ['12-inch transparent white vinyl print'],
        // },
        // {
        //   name: 'nfc',
        //   value: ['Digital Studio Session NFC Experience'],
        // },
        // {
        //   name: 'audio',
        //   value: ['Full lossless audio master + alternate acapellas'],
        // },
      ],
      stock: 4218,
      isUsed: false,
    },
    {
      id: idGenerator(),
      artist: 'Sienna Solas',
      name: 'One Breath Left Virtual Vinyl™',
      images: [
        '/assets/static/images/merchandise/sienna_solas_2_one_breath_left_0.jpg',
        '/assets/static/images/merchandise/sienna_solas_2_one_breath_left_1.jpg',
        '/assets/static/images/merchandise/sienna_solas_2_one_breath_left_2.jpg',
      ],
      price: 125,
      sku: 'SS-COL-002-SSG',
      description: `
      <p><span>An achingly intimate record about suspense and surrender,&nbsp;</span><em><span>One Breath Left</span></em><span>&nbsp;finds Sienna suspended between control and collapse. The production is submerged, dreamlike - basslines that move like currents, vocals that glisten through water. Each Virtual Vinyl&trade; includes a digital immersion film that visually recreates the album&rsquo;s themes of breath and rebirth, best experienced with headphones in the dark.</span></p>
<p><br></p>
      `,
      stock: 3941,
      tags: ['1 OF 5000 AVAILABLE', 'Digital Collectible', 'Virtual Vinyl™'],
      labels: [
        {
          name: '1 OF 5000 AVAILABLE',
          color: '#fff',
          background: '#4cc8bc',
        },

        {
          name: 'Digital Collectible',
          color: '#fff',
          background: '#2c2e35',
        },
        {
          name: 'Virtual Vinyl™',
          color: '#fff',
          background: '#2c2e35',
        },
        //  {
        //   name: 'Exclusive early access',
        //   color: '#111',
        //   background: '#fff7a1',
        // },
      ],
      // options: {
      //   colors: ['#FFF7A1', '#A1FFAF', '#A1A6FF', '#FFA1EB', '#FFA1A3'],
      //   sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      // },
      parameters: [
        {
          name: 'specifications',
          value: ['12-inch aqua vinyl print', 'Haptic audio', 'Includes “Drown Slow”'],
        },
        //  {
        //     name: 'vinyl',
        //     value: ['12-inch aqua vinyl print'],
        //   },
        //   {
        //     name: 'nfc',
        //     value: ['Haptic audio mix via NFC unlock'],
        //   },
        //   {
        //     name: 'content',
        //     value: ['Includes “Drown Slow”'],
        //   },
      ],
    },
    {
      id: idGenerator(),
      artist: 'Sienna Solas',
      name: 'Neon Garden Virtual Vinyl™',
      images: [
        '/assets/static/images/merchandise/sienna_solas_3_neon_garden_0.jpg',
        '/assets/static/images/merchandise/sienna_solas_3_neon_garden_1.jpg',
        '/assets/static/images/merchandise/sienna_solas_3_neon_garden_2.jpg',
      ],
      price: 125,
      sku: 'SS-APP-003-SAJ',
      description: `
      <p><span>Color explodes and shadows breathe in&nbsp;</span><em><span style="font-size:12pt;font-family:Arial,sans-serif;">Neon Garden</span></em><span >, Sienna&rsquo;s most vivid electro-pop experiment to date. It&rsquo;s a lush escape into a world where nature glows under synthetic moons and emotion blooms in UV color. Tapping the NFC embedded in the artwork unlocks a 360&deg; audio-visual garden - animated flowers respond to your touch while Sienna&rsquo;s voice unfolds petal by petal.</span></p>
<p><br></p>
      `,
      stock: 63,
      tags: ['1 OF 100 AVAILABLE', 'Digital Collectible', 'Virtual Vinyl™'],
      labels: [
        {
          name: '1 OF 100 AVAILABLE',
          color: '#fff',
          background: '#4cc8bc',
        },

        {
          name: 'Digital Collectible',
          color: '#fff',
          background: '#2c2e35',
        },
        {
          name: 'Virtual Vinyl™',
          color: '#fff',
          background: '#2c2e35',
        },
      ],
      options: {
        // colors: ['#FFF7A1', '#A1FFAF', '#A1A6FF', '#FFA1EB', '#FFA1A3'],
        // sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      parameters: [
        {
          name: 'specifications',
          value: [
            '12-inch multi-hue UV vinyl print',
            'Interactive AR garden visual',
            'Digital 5.1 mix in Dolby ',
          ],
        },
        //  {
        //     name: 'vinyl',
        //     value: ['12-inch multi-hue UV vinyl print'],
        //   },
        //   {
        //     name: 'visual',
        //     value: ['Interactive AR garden visual'],
        //   },
        //   {
        //     name: 'audio',
        //     value: ['Digital 5.1 mix in Dolby'],
        //   },
      ],
    },
    {
      id: idGenerator(),
      artist: 'Sienna Solas',
      name: 'Halfway to Human Virtual Vinyl™',
      images: [
        '/assets/static/images/merchandise/sienna_solas_4_halfway_to_human_0.jpg',
        '/assets/static/images/merchandise/sienna_solas_4_halfway_to_human_1.jpg',
        '/assets/static/images/merchandise/sienna_solas_4_halfway_to_human_2.jpg',
      ],
      price: 125,
      sku: 'SS-ACC-004-RSD',
      description: `
    <p>Half synthetic, half soul - Halfway to Human is Sienna&rsquo;s reflection on connection in a coded world. Robotic beats meet human imperfection, and the result is something eerily alive. This Virtual Vinyl&trade; unlocks an AI-generated performance built from Sienna&rsquo;s own motion capture data - a digital twin singing in perfect sync to its creator.</p>
<p><br></p>
      `,
      stock: 4302,
      tags: ['1 OF 5000 AVAILABLE', 'Digital Collectible', 'Virtual Vinyl™'],
      labels: [
        {
          name: '1 OF 5000 AVAILABLE',
          color: '#fff',
          background: '#4cc8bc',
        },

        {
          name: 'Digital Collectible',
          color: '#fff',
          background: '#2c2e35',
        },
        {
          name: 'Virtual Vinyl™',
          color: '#fff',
          background: '#2c2e35',
        },
        //  {
        //   name: 'Exclusive early access',
        //   color: '#111',
        //   background: '#fff7a1',
        // },
      ],
      options: {
        // colors: ['#FFF7A1', '#A1FFAF', '#A1A6FF', '#FFA1EB', '#FFA1A3'],
        // sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      parameters: [
        {
          name: 'specifications',
          value: [
            '12-inch holographic vinyl print',
            'NFC portal to AI Live Session',
            ' Lossless download + stems',
          ],
        },

        //  {
        //     name: 'vinyl',
        //     value: ['12-inch holographic vinyl print'],
        //   },
        //   {
        //     name: 'nfc',
        //     value: ['NFC portal to AI Live Session'],
        //   },
        //   {
        //     name: 'audio',
        //     value: ['Lossless download + stems'],
        //   },
      ],
    },
    {
      id: idGenerator(),
      artist: 'Sienna Solas',
      name: 'Echo House” Virtual Vinyl™',
      images: [
        '/assets/static/images/merchandise/sienna_solas_5_echo_house_0.jpg',
        '/assets/static/images/merchandise/sienna_solas_5_echo_house_1.jpg',
        '/assets/static/images/merchandise/sienna_solas_5_echo_house_2.jpg',
      ],
      price: 125,
      sku: 'SS-ACC-004-RSD',
      description: `
    <p>Recorded in a desert installation where sound reflected off walls of glass and sand, Echo House is Sienna alone with infinity. The songs ripple like light in wind, with piano melodies as soft as air. Each Virtual Vinyl&trade; includes an immersive &ldquo;Sound Room&rdquo; experience - an audio-responsive space that shifts based on the listener&rsquo;s voice.</p>
<p><br></p>
      `,
      stock: 3887,
      tags: ['1 OF 5000 AVAILABLE', 'Digital Collectible', 'Virtual Vinyl™'],
      labels: [
        {
          name: '1 OF 5000 AVAILABLE',
          color: '#fff',
          background: '#4cc8bc',
        },

        {
          name: 'Digital Collectible',
          color: '#fff',
          background: '#2c2e35',
        },
        {
          name: 'Virtual Vinyl™',
          color: '#fff',
          background: '#2c2e35',
        },
        //  {
        //   name: 'Exclusive early access',
        //   color: '#111',
        //   background: '#fff7a1',
        // },
      ],
      options: {
        // colors: ['#FFF7A1', '#A1FFAF', '#A1A6FF', '#FFA1EB', '#FFA1A3'],
        // sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      parameters: [
        {
          name: 'specifications',
          value: [
            '12-inch holographic vinyl print',
            'Voice-responsive soundscape via NFC',
            'Includes Desert Echo Rework EP',
          ],
        },

        //  {
        //     name: 'vinyl',
        //     value: ['12-inch holographic vinyl print'],
        //   },
        //   {
        //     name: 'nfc',
        //     value: ['Voice-responsive soundscape via NFC'],
        //   },
        //   {
        //     name: 'includes',
        //     value: ['Includes Desert Echo Rework EP'],
        //   },
      ],
    },
    {
      id: idGenerator(),
      artist: 'Sienna Solas',
      name: 'Chapters Virtual Vinyl™',
      images: [
        '/assets/static/images/merchandise/sienna_solas_6_chapters_0.jpg',
        '/assets/static/images/merchandise/sienna_solas_6_chapters_1.jpg',
        '/assets/static/images/merchandise/sienna_solas_6_chapters_2.jpg',
      ],
      price: 125,
      sku: 'SS-ACC-004-RSD',
      description: `
    <p>An album about memory, letters, and unfinished love stories, Chapters reads like a sonic journal. Handwritten lyrics and field recordings thread through folk melodies and lo-fi production. Tapping the NFC reveals Sienna&rsquo;s digital scrapbook - audio entries, old voice notes, and hidden polaroids from the writing process.</p>
      `,
      stock: 4012,
      tags: ['1 OF 5000 AVAILABLE', 'Digital Collectible', 'Virtual Vinyl™'],
      labels: [
        {
          name: '1 OF 5000 AVAILABLE',
          color: '#fff',
          background: '#4cc8bc',
        },

        {
          name: 'Digital Collectible',
          color: '#fff',
          background: '#2c2e35',
        },
        {
          name: 'Virtual Vinyl™',
          color: '#fff',
          background: '#2c2e35',
        },
        //  {
        //   name: 'Exclusive early access',
        //   color: '#111',
        //   background: '#fff7a1',
        // },
      ],
      options: {
        // colors: ['#FFF7A1', '#A1FFAF', '#A1A6FF', '#FFA1EB', '#FFA1A3'],
        // sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      parameters: [
        {
          name: 'specifications',
          value: [
            '12-inch emerald vinyl print',
            ' Interactive journal portal',
            'Hi-res download + lyric book PDF',
          ],
        },

        //  {
        //     name: 'vinyl',
        //     value: ['12-inch emerald vinyl print'],
        //   },
        //   {
        //     name: 'portal',
        //     value: [' Interactive journal portal'],
        //   },
        //   {
        //     name: 'download',
        //     value: ['Hi-res download + lyric book PDF'],
        //   },
      ],
    },
    {
      id: idGenerator(),
      artist: 'Sienna Solas',
      name: 'Ocean Echoes Virtual Vinyl™',
      images: [
        '/assets/static/images/merchandise/sienna_solas_7_ocean_echoes_0.jpg',
        '/assets/static/images/merchandise/sienna_solas_7_ocean_echoes_1.jpg',
        '/assets/static/images/merchandise/sienna_solas_7_ocean_echoes_2.jpg',
      ],
      price: 125,
      sku: 'SS-ACC-004-RSD',
      description: `
   <p><em><span style="font-weight: 400;">Ocean Echoes</span></em><span style="font-weight: 400;"> is the sound of reflection itself - a balm of warmth, grace, and melancholy. Sienna&rsquo;s voice moves like tides, rising and falling around minimalist production that feels both infinite and intimate. The Virtual Vinyl&trade; unlocks &ldquo;Echo Tides,&rdquo; an interactive visual of waves reacting to your touch, paired with Sienna&rsquo;s exclusive acoustic performance on the beach at dawn.</span></p>
    `,
      stock: 4224,
      tags: ['1 OF 5000 AVAILABLE', 'Digital Collectible', 'Virtual Vinyl™'],
      labels: [
        {
          name: '1 OF 5000 AVAILABLE',
          color: '#fff',
          background: '#4cc8bc',
        },

        {
          name: 'Digital Collectible',
          color: '#fff',
          background: '#2c2e35',
        },
        {
          name: 'Virtual Vinyl™',
          color: '#fff',
          background: '#2c2e35',
        },
        //  {
        //   name: 'Exclusive early access',
        //   color: '#111',
        //   background: '#fff7a1',
        // },
      ],
      options: {
        // colors: ['#FFF7A1', '#A1FFAF', '#A1A6FF', '#FFA1EB', '#FFA1A3'],
        // sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      parameters: [
        {
          name: 'specifications',
          value: [
            '12-inch iridescent vinyl print',
            'Tactile waveform visual experience',
            'Hi-fidelity ocean-mastered mix',
          ],
        },

        //  {
        //     name: 'vinyl',
        //     value: ['12-inch iridescent vinyl print'],
        //   },
        //   {
        //     name: 'visuals',
        //     value: ['Tactile waveform visual experience'],
        //   },
        //   {
        //     name: 'audio',
        //     value: ['Hi-fidelity ocean-mastered mix'],
        //   },
      ],
    },
    {
      id: idGenerator(),
      artist: 'Sienna Solas',
      name: 'Glass Memory Virtual Vinyl™',
      images: [
        '/assets/static/images/merchandise/sienna_solas_8_glass_memory_0.jpg',
        '/assets/static/images/merchandise/sienna_solas_8_glass_memory_1.jpg',
        '/assets/static/images/merchandise/sienna_solas_8_glass_memory_2.jpg',
      ],
      price: 125,
      sku: 'SS-ACC-004-RSD',
      description: `
 <p><span style="font-weight: 400;">Fogged edges. Blurred thoughts. </span><em><span style="font-weight: 400;">Glass Memory</span></em><span style="font-weight: 400;"> traps emotion behind cold transparency - a haunting exploration of what we choose to forget. Sienna&rsquo;s vocals echo against minimalist production and industrial reverb. Each Virtual Vinyl&trade; includes an NFC-activated AR experience where lyrics appear as frost on your screen, fading as you touch them.</span></p>
   `,
      stock: 3776,
      tags: ['1 OF 5000 AVAILABLE', 'Digital Collectible', 'Virtual Vinyl™'],
      labels: [
        {
          name: '1 OF 5000 AVAILABLE',
          color: '#fff',
          background: '#4cc8bc',
        },

        {
          name: 'Digital Collectible',
          color: '#fff',
          background: '#2c2e35',
        },
        {
          name: 'Virtual Vinyl™',
          color: '#fff',
          background: '#2c2e35',
        },
        //  {
        //   name: 'Exclusive early access',
        //   color: '#111',
        //   background: '#fff7a1',
        // },
      ],
      options: {
        // colors: ['#FFF7A1', '#A1FFAF', '#A1A6FF', '#FFA1EB', '#FFA1A3'],
        // sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      parameters: [
        {
          name: 'specifications',
          value: [
            '12-inch smoky blue vinyl print',
            'AR lyric frost overlay',
            'Includes “Erase Me” live',
          ],
        },

        //  {
        //     name: 'vinyl',
        //     value: ['12-inch smoky blue vinyl print'],
        //   },
        //   {
        //     name: 'visuals',
        //     value: ['AR lyric frost overlay'],
        //   },
        //   {
        //     name: 'audio',
        //     value: ['Includes “Erase Me” live'],
        //   },
      ],
    },
    {
      id: idGenerator(),
      artist: 'Sienna Solas',
      name: 'Moonlight Motel Virtual Vinyl™',
      images: [
        '/assets/static/images/merchandise/sienna_solas_9_moonlight_motel_0.jpg',
        '/assets/static/images/merchandise/sienna_solas_9_moonlight_motel_1.jpg',
        '/assets/static/images/merchandise/sienna_solas_9_moonlight_motel_2.jpg',
      ],
      price: 125,
      sku: 'SS-ACC-004-RSD',
      description: `
<p><span style="font-weight: 400;">Neon signs, midnight confessions, and the quiet hum of a flickering light- </span><em><span style="font-weight: 400;">Moonlight Motel</span></em><span style="font-weight: 400;"> captures Sienna&rsquo;s noir-pop phase in cinematic form. It&rsquo;s an album of escape and echoes, written for anyone who&rsquo;s ever run away and looked back. The Virtual Vinyl&trade; includes a digital short film shot in a real motel room during recording sessions.</span></p>
      `,
      stock: 3982,
      tags: ['1 OF 5000 AVAILABLE', 'Digital Collectible', 'Virtual Vinyl™'],
      labels: [
        {
          name: '1 OF 5000 AVAILABLE',
          color: '#fff',
          background: '#4cc8bc',
        },

        {
          name: 'Digital Collectible',
          color: '#fff',
          background: '#2c2e35',
        },
        {
          name: 'Virtual Vinyl™',
          color: '#fff',
          background: '#2c2e35',
        },
      ],
      options: {
        // colors: ['#FFF7A1', '#A1FFAF', '#A1A6FF', '#FFA1EB', '#FFA1A3'],
        // sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      parameters: [
        {
          name: 'specifications',
          value: [
            '12-inch marbled nightshade vinyl print',
            'NFC unlock for film & alternate score mix',
            'Dolby Vision remaster',
          ],
        },
      ],
    },
    {
      id: idGenerator(),
      artist: 'Sienna Solas',
      name: 'Sunday Morning” Virtual Vinyl™',
      images: [
        '/assets/static/images/merchandise/sienna_solas_10_sunday_morning_0.jpg',
        '/assets/static/images/merchandise/sienna_solas_10_sunday_morning_1.jpg',
        '/assets/static/images/merchandise/sienna_solas_10_sunday_morning_2.jpg',
      ],
      price: 125,
      sku: 'SS-ACC-004-RSD',
      description: `
<p><span style="font-weight: 400;">Warm light, acoustic strings, and handwritten lyrics - </span><em><span style="font-weight: 400;">Sunday Morning</span></em><span style="font-weight: 400;"> is the album that started it all. Recorded entirely in Sienna&rsquo;s living room, it&rsquo;s an ode to quiet joy and imperfection. The Virtual Vinyl&trade; unlocks &ldquo;Morning Light,&rdquo; a live video message from Sienna and an exclusive alternate take of the title track captured on cassette.</span></p>
      `,
      stock: 3982,
      tags: ['1 OF 5000 AVAILABLE', 'Digital Collectible', 'Virtual Vinyl™'],
      labels: [
        {
          name: '1 OF 5000 AVAILABLE',
          color: '#fff',
          background: '#4cc8bc',
        },

        {
          name: 'Digital Collectible',
          color: '#fff',
          background: '#2c2e35',
        },
        {
          name: 'Virtual Vinyl™',
          color: '#fff',
          background: '#2c2e35',
        },
      ],
      options: {
        // colors: ['#FFF7A1', '#A1FFAF', '#A1A6FF', '#FFA1EB', '#FFA1A3'],
        // sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      parameters: [
        {
          name: 'specifications',
          value: [
            '12-inch textured vinyl print',
            'Home session audio mix',
            'NFC unlock to living room performance film',
          ],
        },
        //  {
        //     name: 'vinyl',
        //     value: ['12-inch textured vinyl print'],
        //   },
        //   {
        //     name: 'visuals',
        //     value: [' Home session audio mix'],
        //   },
        //   {
        //     name: 'audio',
        //     value: ['NFC unlock to living room performance film'],
        //   },
      ],
    },
    {
      id: idGenerator(),
      artist: 'Sienna Solas',
      name: 'Stones Virtual Vinyl™',
      images: [
        '/assets/static/images/merchandise/sienna_solas_11_stones_0.jpg',
        '/assets/static/images/merchandise/sienna_solas_11_stones_1.jpg',
        '/assets/static/images/merchandise/sienna_solas_11_stones_2.jpg',
      ],
      price: 125,
      sku: 'SS-ACC-004-RSD',
      description: `
<p><em><span style="font-weight: 400;">Stones</span></em><span style="font-weight: 400;"> is quiet strength captured in sound - a meditation on solitude, endurance, and the beauty of what remains. Written during a winter spent in isolation, Sienna recorded the album in a glass house overlooking a barren landscape, where silence became an instrument of its own. The Virtual Vinyl&trade; experience unlocks </span><em><span style="font-weight: 400;">&ldquo;The Glass Sessions&rdquo;</span></em><span style="font-weight: 400;"> - a short documentary and live performance filmed in that same house, where every whisper of wind and flicker of fire becomes part of the music.</span></p>
      `,
      stock: 4037,
      tags: ['1 OF 5000 AVAILABLE', 'Digital Collectible', 'Virtual Vinyl™'],
      labels: [
        {
          name: '1 OF 5000 AVAILABLE',
          color: '#fff',
          background: '#4cc8bc',
        },

        {
          name: 'Digital Collectible',
          color: '#fff',
          background: '#2c2e35',
        },
        {
          name: 'Virtual Vinyl™',
          color: '#fff',
          background: '#2c2e35',
        },
      ],
      options: {
        // colors: ['#FFF7A1', '#A1FFAF', '#A1A6FF', '#FFA1EB', '#FFA1A3'],
        // sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      parameters: [
        {
          name: 'specifications',
          value: [
            '12-inch matte-finish vinyl print',
            ' NFC unlock to “The Glass Sessions” film',
            'Mastered analog-to-digital from original tape',
          ],
        },
        //  {
        //     name: 'vinyl',
        //     value: ['12-inch matte-finish vinyl print'],
        //   },
        //   {
        //     name: 'visuals',
        //     value: [' NFC unlock to “The Glass Sessions” film'],
        //   },
        //   {
        //     name: 'audio',
        //     value: ['Mastered analog-to-digital from original tape'],
        //   },
      ],
    },
  ],
  [
    {
      id: idGenerator(),
      artist: 'Caden Kane',
      name: 'Heart Over Hunger Virtual Vinyl™',
      images: [
        '/assets/static/images/merchandise/caden_kane_1_heart_over_hunger_0.jpg',
        '/assets/static/images/merchandise/caden_kane_1_heart_over_hunger_1.jpg',
        '/assets/static/images/merchandise/caden_kane_1_heart_over_hunger_2.jpg',
      ],
      price: 125,
      sku: 'SS-ACC-004-RSD',
      description: `
<p><em><span style="font-weight: 400;">Heart Over Hunger</span></em><span style="font-weight: 400;"> is the record that introduced Caden Kane&rsquo;s unmistakable duality - the hunger of ambition vs. the heart that refuses to harden. The stripped-back production lets his voice cut through the darkness, hungry and hopeful all at once. Every Virtual Vinyl&trade; includes the </span><em><span style="font-weight: 400;">&ldquo;Table Talk&rdquo;</span></em><span style="font-weight: 400;"> digital experience - an NFC-activated behind-the-scenes session where Caden reflects on the sacrifices, sleepless nights, and scars behind every verse.</span></p>
      `,
      stock: 4194,
      tags: ['1 OF 5000 AVAILABLE', 'Digital Collectible', 'Virtual Vinyl™'],
      labels: [
        {
          name: '1 OF 5000 AVAILABLE',
          color: '#fff',
          background: '#4cc8bc',
        },

        {
          name: 'Digital Collectible',
          color: '#fff',
          background: '#2c2e35',
        },
        {
          name: 'Virtual Vinyl™',
          color: '#fff',
          background: '#2c2e35',
        },
      ],
      options: {
        // colors: ['#FFF7A1', '#A1FFAF', '#A1A6FF', '#FFA1EB', '#FFA1A3'],
        // sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      parameters: [
        {
          name: 'specifications',
          value: [
            '12-inch matte black vinyl print',
            'NFC unlock to “Table Talk” exclusive film',
            ' Studio stems + lyric notepad PDF',
          ],
        },
        //  {
        //     name: 'vinyl',
        //     value: ['12-inch matte black vinyl print'],
        //   },
        //   {
        //     name: 'visuals',
        //     value: ['NFC unlock to “Table Talk” exclusive film'],
        //   },
        //   {
        //     name: 'audio',
        //     value: [' Studio stems + lyric notepad PDF'],
        //   },
      ],
    },
    {
      id: idGenerator(),
      artist: 'Caden Kane',
      name: 'Concrete & Roses Virtual Vinyl™',
      images: [
        '/assets/static/images/merchandise/caden_kane_2_concrete_roses_0.jpg',
        '/assets/static/images/merchandise/caden_kane_2_concrete_roses_1.jpg',
        '/assets/static/images/merchandise/caden_kane_2_concrete_roses_2.jpg',
      ],
      price: 125,
      sku: 'SS-ACC-004-RSD',
      description: `
<p><span style="font-weight: 400;">In </span><em><span style="font-weight: 400;">Concrete &amp; Roses</span></em><span style="font-weight: 400;">, Caden finds beauty in the ruins - an album about growing something pure in the hardest places. Industrial percussion meets orchestral strings, while his voice bridges pain and poetry. The Virtual Vinyl&trade; unlocks </span><em><span style="font-weight: 400;">&ldquo;Bloom in the Breaks&rdquo;</span></em><span style="font-weight: 400;"> - a short film and immersive 3D soundscape built from the album&rsquo;s ambient stems, where every listener experiences a personalized remix that blossoms in real time.</span></p>
      `,
      stock: 1927,
      tags: ['1 OF 5000 AVAILABLE', 'Digital Collectible', 'Virtual Vinyl™'],
      labels: [
        {
          name: '1 OF 5000 AVAILABLE',
          color: '#fff',
          background: '#4cc8bc',
        },

        {
          name: 'Digital Collectible',
          color: '#fff',
          background: '#2c2e35',
        },
        {
          name: 'Virtual Vinyl™',
          color: '#fff',
          background: '#2c2e35',
        },
      ],
      options: {
        // colors: ['#FFF7A1', '#A1FFAF', '#A1A6FF', '#FFA1EB', '#FFA1A3'],
        // sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      parameters: [
        {
          name: 'specifications',
          value: [
            '12-inch crimson-and-grey marbled vinyl print',
            ' NFC 3D audio mix',
            ' 4K “Bloom in the Breaks” visual short',
          ],
        },
        //  {
        //     name: 'vinyl',
        //     value: ['12-inch crimson-and-grey marbled vinyl print'],
        //   },
        //   {
        //     name: 'visuals',
        //     value: [' NFC 3D audio mix'],
        //   },
        //   {
        //     name: 'audio',
        //     value: [' 4K “Bloom in the Breaks” visual short'],
        //   },
      ],
    },
    {
      id: idGenerator(),
      artist: 'Caden Kane',
      name: 'City of Ash Virtual Vinyl™',
      images: [
        '/assets/static/images/merchandise/caden_kane_3_city_of_ash_0.jpg',
        '/assets/static/images/merchandise/caden_kane_3_city_of_ash_1.jpg',
        '/assets/static/images/merchandise/caden_kane_3_city_of_ash_2.jpg',
      ],
      price: 125,
      sku: 'SS-ACC-004-RSD',
      description: `
<p><em><span style="font-weight: 400;">City of Ash</span></em><span style="font-weight: 400;"> is Caden Kane at his most cinematic - a smoldering confessional built from burned-out dreams and the rebirth that follows. With haunting trap beats and orchestral undertones, every track feels like smoke clearing after the storm. Tapping the NFC opens </span><em><span style="font-weight: 400;">&ldquo;The Burn Session&rdquo;</span></em><span style="font-weight: 400;"> - a visual experience blending footage from abandoned cityscapes with never-released verses that didn&rsquo;t make the final cut.</span></p>
      `,
      stock: 76,
      tags: ['1 OF 5000 AVAILABLE', 'Digital Collectible', 'Virtual Vinyl™'],
      labels: [
        {
          name: '1 OF 5000 AVAILABLE',
          color: '#fff',
          background: '#4cc8bc',
        },

        {
          name: 'Digital Collectible',
          color: '#fff',
          background: '#2c2e35',
        },
        {
          name: 'Virtual Vinyl™',
          color: '#fff',
          background: '#2c2e35',
        },
      ],
      options: {
        // colors: ['#FFF7A1', '#A1FFAF', '#A1A6FF', '#FFA1EB', '#FFA1A3'],
        // sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      parameters: [
        {
          name: 'specifications',
          value: [
            '12-inch ashen black vinyl print',
            ' NFC unlock to “Burn Session” visual',
            ' 24-bit digital master with bonus track “Cinder Soul”',
          ],
        },
        //  {
        //     name: 'vinyl',
        //     value: ['12-inch ashen black vinyl print'],
        //   },
        //   {
        //     name: 'visuals',
        //     value: [' NFC unlock to “Burn Session” visual'],
        //   },
        //   {
        //     name: 'audio',
        //     value: [' 24-bit digital master with bonus track “Cinder Soul”'],
        //   },
      ],
    },
  ],
  [
    {
      id: idGenerator(),
      artist: 'Nyko Blaze',
      name: 'Ashes & Algorithms Virtual Vinyl™',
      images: [
        '/assets/static/images/merchandise/nyko_blaze_1_ashes_algorithms_0.jpg',
        '/assets/static/images/merchandise/nyko_blaze_1_ashes_algorithms_1.jpg',
        '/assets/static/images/merchandise/nyko_blaze_1_ashes_algorithms_2.jpg',
      ],
      price: 125,
      sku: 'SS-ACC-004-RSD',
      description: `
<p>Where smoke meets code, Ashes &amp; Algorithms begins. Nyko Blaze fuses soul and circuitry in this darkly hypnotic debut - verses about rebirth, recursion, and revolution over glitch-laden beats that feel both ancient and futuristic. Each Virtual Vinyl&trade; includes the &ldquo;Human.exe&rdquo; experience - an NFC-activated digital session that deconstructs each track in real time, visualizing the algorithms behind his sound while his voice narrates the story of his own reconstruction.</p>
      `,
      stock: 217,
      tags: ['1 OF 5000 AVAILABLE', 'Digital Collectible', 'Virtual Vinyl™'],
      labels: [
        {
          name: '1 OF 5000 AVAILABLE',
          color: '#fff',
          background: '#4cc8bc',
        },

        {
          name: 'Digital Collectible',
          color: '#fff',
          background: '#2c2e35',
        },
        {
          name: 'Virtual Vinyl™',
          color: '#fff',
          background: '#2c2e35',
        },
      ],
      options: {
        // colors: ['#FFF7A1', '#A1FFAF', '#A1A6FF', '#FFA1EB', '#FFA1A3'],
        // sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      parameters: [
        {
          name: 'specifications',
          value: [
            '12-inch deep black vinyl print with neon-green circuit detailing',
            'NFC unlock for interactive Human.exe experience',
            'Includes “Codeburn (Alt Mix)” bonus track',
          ],
        },
        //  {
        //     name: 'vinyl',
        //     value: ['12-inch deep black vinyl print with neon-green circuit detailing'],
        //   },
        //   {
        //     name: 'visuals',
        //     value: ['NFC unlock for interactive Human.exe experience'],
        //   },
        //   {
        //     name: 'audio',
        //     value: ['Includes “Codeburn (Alt Mix)” bonus track'],
        //   },
      ],
    },
    {
      id: idGenerator(),
      artist: 'Nyko Blaze',
      name: 'Everything Burns Slow Virtual Vinyl™',
      images: [
        '/assets/static/images/merchandise/nyko_blaze_2_everything_burns_slow_0.jpg',
        '/assets/static/images/merchandise/nyko_blaze_2_everything_burns_slow_1.jpg',
        '/assets/static/images/merchandise/nyko_blaze_2_everything_burns_slow_2.jpg',
      ],
      price: 125,
      sku: 'SS-ACC-004-RSD',
      description: `
<p><em><span style="font-weight: 400;">Everything Burns Slow</span></em><span style="font-weight: 400;"> is a late-night confessional - heat, hunger, and heartbreak over candlelit production. It&rsquo;s Nyko&rsquo;s meditation on ambition and the cost of glow. Every Virtual Vinyl&trade; comes with </span><em><span style="font-weight: 400;">&ldquo;The Ember Dinner&rdquo;</span></em><span style="font-weight: 400;">, a cinematic digital short unlocked through NFC - an intimate visual performance filmed in one take where every flame syncs to the pulse of his live vocals.</span></p>
      `,
      stock: 964,
      tags: ['1 OF 5000 AVAILABLE', 'Digital Collectible', 'Virtual Vinyl™'],
      labels: [
        {
          name: '1 OF 5000 AVAILABLE',
          color: '#fff',
          background: '#4cc8bc',
        },

        {
          name: 'Digital Collectible',
          color: '#fff',
          background: '#2c2e35',
        },
        {
          name: 'Virtual Vinyl™',
          color: '#fff',
          background: '#2c2e35',
        },
      ],
      options: {
        // colors: ['#FFF7A1', '#A1FFAF', '#A1A6FF', '#FFA1EB', '#FFA1A3'],
        // sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      parameters: [
        {
          name: 'specifications',
          value: [
            '12-inch amber marbled vinyl print',
            'NFC unlock for The Ember Dinner film',
            '24-bit master + flame-synced visual audio',
          ],
        },
        //  {
        //     name: 'vinyl',
        //     value: ['12-inch amber marbled vinyl print'],
        //   },
        //   {
        //     name: 'visuals',
        //     value: ['NFC unlock for The Ember Dinner film'],
        //   },
        //   {
        //     name: 'audio',
        //     value: ['24-bit master + flame-synced visual audio'],
        //   },
      ],
    },
    {
      id: idGenerator(),
      artist: 'Nyko Blaze',
      name: 'Not Today Virtual Vinyl™',
      images: [
        '/assets/static/images/merchandise/nyko_blaze_3_not_today_0.jpg',
        '/assets/static/images/merchandise/nyko_blaze_3_not_today_1.jpg',
        '/assets/static/images/merchandise/nyko_blaze_3_not_today_2.jpg',
      ],
      price: 125,
      sku: 'SS-ACC-004-RSD',
      description: `
<p><span style="font-weight: 400;">&nbsp;Defiant and minimal, </span><em><span style="font-weight: 400;">Not Today</span></em><span style="font-weight: 400;"> is Nyko Blaze&rsquo;s manifesto - a stripped-back, percussive project built on raw resistance. Every beat feels like a heartbeat refusing to stop. The Virtual Vinyl&trade; unlocks </span><em><span style="font-weight: 400;">&ldquo;The Last Word&rdquo;</span></em><span style="font-weight: 400;">, an immersive AR experience where Nyko&rsquo;s handwritten verses appear as graffiti across your screen, fading and reappearing in rhythm with the track&rsquo;s bassline.</span></p>
      `,
      stock: 4091,
      tags: ['1 OF 5000 AVAILABLE', 'Digital Collectible', 'Virtual Vinyl™'],
      labels: [
        {
          name: '1 OF 5000 AVAILABLE',
          color: '#fff',
          background: '#4cc8bc',
        },

        {
          name: 'Digital Collectible',
          color: '#fff',
          background: '#2c2e35',
        },
        {
          name: 'Virtual Vinyl™',
          color: '#fff',
          background: '#2c2e35',
        },
      ],
      options: {
        // colors: ['#FFF7A1', '#A1FFAF', '#A1A6FF', '#FFA1EB', '#FFA1A3'],
        // sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      parameters: [
        {
          name: 'specifications',
          value: [
            '2-inch matte grey vinyl print',
            'NFC unlock to The Last Word AR graffiti session',
            'Includes “Hold the Line (Live Rehearsal)” bonus',
          ],
        },
        //  {
        //     name: 'vinyl',
        //     value: ['2-inch matte grey vinyl print'],
        //   },
        //   {
        //     name: 'visuals',
        //     value: ['NFC unlock to The Last Word AR graffiti session'],
        //   },
        //   {
        //     name: 'audio',
        //     value: ['Includes “Hold the Line (Live Rehearsal)” bonus'],
        //   },
      ],
    },
  ],
  [
    {
      id: idGenerator(),
      artist: 'Sevenblock',
      name: 'Not Today Virtual Vinyl™',
      images: [
        '/assets/static/images/merchandise/sevenblock_1_all_saints_wear_timbs_0.jpg',
        '/assets/static/images/merchandise/sevenblock_1_all_saints_wear_timbs_1.jpg',
        '/assets/static/images/merchandise/sevenblock_1_all_saints_wear_timbs_2.jpg',
      ],
      price: 125,
      sku: 'SS-ACC-004-RSD',
      description: `
<p><em><span style="font-weight: 400;">All Saints Wear Timbs</span></em><span style="font-weight: 400;"> finds holiness in the hustle - SevenBlock&rsquo;s sermon from the streets. Recorded between Brooklyn basements and a church on Union Ave, this project pairs gospel chords with gritty confessionals about redemption, loyalty, and loss. Each Virtual Vinyl&trade; unlocks </span><em><span style="font-weight: 400;">&ldquo;The Chapel Session&rdquo;</span></em><span style="font-weight: 400;"> - an immersive digital performance filmed live in that same church, where SevenBlock delivers stripped-down renditions of his most personal verses.</span></p>
      `,
      stock: 4182,
      tags: ['1 OF 5000 AVAILABLE', 'Digital Collectible', 'Virtual Vinyl™'],
      labels: [
        {
          name: '1 OF 5000 AVAILABLE',
          color: '#fff',
          background: '#4cc8bc',
        },

        {
          name: 'Digital Collectible',
          color: '#fff',
          background: '#2c2e35',
        },
        {
          name: 'Virtual Vinyl™',
          color: '#fff',
          background: '#2c2e35',
        },
      ],
      options: {
        // colors: ['#FFF7A1', '#A1FFAF', '#A1A6FF', '#FFA1EB', '#FFA1A3'],
        // sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      parameters: [
        {
          name: 'specifications',
          value: [
            '12-inch black vinyl with gold edge detailing',
            'NFC unlock for The Chapel Session film ',
            'High-fidelity 24-bit masters + exclusive behind-the-scenes commentary',
          ],
        },
        //  {
        //     name: 'vinyl',
        //     value: ['12-inch black vinyl with gold edge detailing'],
        //   },
        //   {
        //     name: 'visuals',
        //     value: ['NFC unlock for The Chapel Session film '],
        //   },
        //   {
        //     name: 'audio',
        //     value: ['High-fidelity 24-bit masters + exclusive behind-the-scenes commentary'],
        //   },
      ],
    },
    {
      id: idGenerator(),
      artist: 'Sevenblock',
      name: 'Heaven Got Corners Virtual Vinyl™',
      images: [
        '/assets/static/images/merchandise/sevenblock_2_all_heaven_got_corners_0.jpg',
        '/assets/static/images/merchandise/sevenblock_2_all_heaven_got_corners_1.jpg',
        '/assets/static/images/merchandise/sevenblock_2_all_heaven_got_corners_2.jpg',
      ],
      price: 125,
      sku: 'SS-ACC-004-RSD',
      description: `
<p><em><span style="font-weight: 400;">Heaven Got Corners</span></em><span style="font-weight: 400;"> is the sound of faith meeting the fog - the blurred line between right and wrong, light and shadow. SevenBlock raps like a man caught between both, his verses glowing with grief and grace. The Virtual Vinyl&trade; experience includes </span><em><span style="font-weight: 400;">&ldquo;Between Streets &amp; Stars&rdquo;</span></em><span style="font-weight: 400;">, an NFC-activated augmented reality film that places listeners right on the crossroads where the album was born, with angel wings rendered in neon light as each track unfolds.</span></p>
      `,
      stock: 3909,
      tags: ['1 OF 5000 AVAILABLE', 'Digital Collectible', 'Virtual Vinyl™'],
      labels: [
        {
          name: '1 OF 5000 AVAILABLE',
          color: '#fff',
          background: '#4cc8bc',
        },

        {
          name: 'Digital Collectible',
          color: '#fff',
          background: '#2c2e35',
        },
        {
          name: 'Virtual Vinyl™',
          color: '#fff',
          background: '#2c2e35',
        },
      ],
      options: {
        // colors: ['#FFF7A1', '#A1FFAF', '#A1A6FF', '#FFA1EB', '#FFA1A3'],
        // sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      parameters: [
        {
          name: 'specifications',
          value: [
            '12-inch haze-grey vinyl print',
            'NFC unlock for Between Streets & Stars AR film',
            'Includes alternate outro “Crown in the Rain”',
          ],
        },
        //  {
        //     name: 'vinyl',
        //     value: ['12-inch haze-grey vinyl print'],
        //   },
        //   {
        //     name: 'visuals',
        //     value: ['NFC unlock for Between Streets & Stars AR film '],
        //   },
        //   {
        //     name: 'audio',
        //     value: ['Includes alternate outro “Crown in the Rain”'],
        //   },
      ],
    },
    {
      id: idGenerator(),
      artist: 'Sevenblock',
      name: 'STL Virtual Vinyl™',
      images: [
        '/assets/static/images/merchandise/sevenblock_3_stl_0.jpg',
        '/assets/static/images/merchandise/sevenblock_3_stl_1.jpg',
        '/assets/static/images/merchandise/sevenblock_3_stl_2.jpg',
      ],
      price: 125,
      sku: 'SS-ACC-004-RSD',
      description: `
<p><span style="font-weight: 400;">A love letter and a confession, </span><em><span style="font-weight: 400;">STL</span></em><span style="font-weight: 400;"> is where it all began. SevenBlock pays tribute to his city - its corners, chaos, and quiet triumphs - through cinematic storytelling and soulful beats that echo like memories. Every Virtual Vinyl&trade; includes </span><em><span style="font-weight: 400;">&ldquo;Home Base&rdquo;</span></em><span style="font-weight: 400;">, a digital short shot entirely on location, blending archival footage and spoken word with visuals that map SevenBlock&rsquo;s roots from block to booth.</span></p>
      `,
      stock: 1053,
      tags: ['1 OF 5000 AVAILABLE', 'Digital Collectible', 'Virtual Vinyl™'],
      labels: [
        {
          name: '1 OF 5000 AVAILABLE',
          color: '#fff',
          background: '#4cc8bc',
        },

        {
          name: 'Digital Collectible',
          color: '#fff',
          background: '#2c2e35',
        },
        {
          name: 'Virtual Vinyl™',
          color: '#fff',
          background: '#2c2e35',
        },
      ],
      options: {
        // colors: ['#FFF7A1', '#A1FFAF', '#A1A6FF', '#FFA1EB', '#FFA1A3'],
        // sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      parameters: [
        {
          name: 'specifications',
          value: [
            '12-inch deep navy vinyl with dove graphic',
            'NFC unlock for Home Base digital film',
            'Exclusive liner notes by SevenBlock',
          ],
        },
        //  {
        //     name: 'vinyl',
        //     value: ['12-inch deep navy vinyl with dove graphic'],
        //   },
        //   {
        //     name: 'visuals',
        //     value: ['NFC unlock for Home Base digital film'],
        //   },
        //   {
        //     name: 'audio',
        //     value: ['Exclusive liner notes by SevenBlock'],
        //   },
      ],
    },
    {
      id: idGenerator(),
      artist: 'Sevenblock',
      name: 'Conversations with the Curb Virtual Vinyl™',
      images: [
        '/assets/static/images/merchandise/sevenblock_4_conversations_with_the_curb_0.jpg',
        '/assets/static/images/merchandise/sevenblock_4_conversations_with_the_curb_1.jpg',
        '/assets/static/images/merchandise/sevenblock_4_conversations_with_the_curb_2.jpg',
      ],
      price: 125,
      sku: 'SS-ACC-004-RSD',
      description: `
<p><em><span style="font-weight: 400;">Conversations with the Curb</span></em><span style="font-weight: 400;"> captures the raw poetry of everyday survival. Recorded outside the studio, using ambient street sounds as percussion, this record blends documentary realism with lyrical depth. The Virtual Vinyl&trade; unlocks </span><em><span style="font-weight: 400;">&ldquo;Dial Tone Dreams&rdquo;</span></em><span style="font-weight: 400;">, a Fangri-la-exclusive AR experience where each listener can &ldquo;call&rdquo; the artist through a virtual payphone, triggering unreleased snippets and voice memos from the album sessions.</span></p>
      `,
      stock: 3872,
      tags: ['1 OF 5000 AVAILABLE', 'Digital Collectible', 'Virtual Vinyl™'],
      labels: [
        {
          name: '1 OF 5000 AVAILABLE',
          color: '#fff',
          background: '#4cc8bc',
        },

        {
          name: 'Digital Collectible',
          color: '#fff',
          background: '#2c2e35',
        },
        {
          name: 'Virtual Vinyl™',
          color: '#fff',
          background: '#2c2e35',
        },
      ],
      options: {
        // colors: ['#FFF7A1', '#A1FFAF', '#A1A6FF', '#FFA1EB', '#FFA1A3'],
        // sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      parameters: [
        {
          name: 'specifications',
          value: [
            '12-inch distressed graphite vinyl print',
            'NFC unlock for Dial Tone Dreams interactive AR',
            ' Bonus track “Static Prayers” included',
          ],
        },
        //  {
        //     name: 'vinyl',
        //     value: ['12-inch distressed graphite vinyl print'],
        //   },
        //   {
        //     name: 'visuals',
        //     value: ['NFC unlock for Dial Tone Dreams interactive AR'],
        //   },
        //   {
        //     name: 'audio',
        //     value: [' Bonus track “Static Prayers” included'],
        //   },
      ],
    },
  ],
  [
    {
      id: idGenerator(),
      artist: 'Nyla Veil',
      name: 'The Quiet Hour Virtual Vinyl™',
      images: [
        '/assets/static/images/merchandise/nyla_veil_1_the_quiet_hour_0.jpg',
        '/assets/static/images/merchandise/nyla_veil_1_the_quiet_hour_1.jpg',
        '/assets/static/images/merchandise/nyla_veil_1_the_quiet_hour_2.jpg',
      ],
      price: 125,
      sku: 'SS-ACC-004-RSD',
      description: `
<p><span style="font-weight: 400;">Recorded in near-darkness between midnight and dawn, </span><em><span style="font-weight: 400;">The Quiet Hour</span></em><span style="font-weight: 400;"> captures Nyla Veil at her most raw and restrained - every inhale, every echo, perfectly preserved. Sparse production and velvet-low vocals make this record feel like a confession whispered through glass. Each Virtual Vinyl&trade; includes </span><em><span style="font-weight: 400;">&ldquo;The Silent Room&rdquo;</span></em><span style="font-weight: 400;"> - an immersive audio-visual session unlocked through NFC, where listeners can experience Nyla&rsquo;s isolated studio environment in 3D sound and spatial lighting synced to her voice.</span></p>
      `,
      stock: 4138,
      tags: ['1 OF 5000 AVAILABLE', 'Digital Collectible', 'Virtual Vinyl™'],
      labels: [
        {
          name: '1 OF 5000 AVAILABLE',
          color: '#fff',
          background: '#4cc8bc',
        },

        {
          name: 'Digital Collectible',
          color: '#fff',
          background: '#2c2e35',
        },
        {
          name: 'Virtual Vinyl™',
          color: '#fff',
          background: '#2c2e35',
        },
      ],
      options: {
        // colors: ['#FFF7A1', '#A1FFAF', '#A1A6FF', '#FFA1EB', '#FFA1A3'],
        // sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      parameters: [
        {
          name: 'specifications',
          value: [
            '12-inch matte-black vinyl print',
            'NFC unlock to The Silent Room immersive experience',
            ' Includes alternate mix “Signal Lost (Intro Reprise)”',
          ],
        },
        //  {
        //     name: 'vinyl',
        //     value: ['12-inch matte-black vinyl print'],
        //   },
        //   {
        //     name: 'visuals',
        //     value: ['NFC unlock to The Silent Room immersive experience'],
        //   },
        //   {
        //     name: 'audio',
        //     value: [' Includes alternate mix “Signal Lost (Intro Reprise)”'],
        //   },
      ],
    },
    {
      id: idGenerator(),
      artist: 'Nyla Veil',
      name: 'Marrow Virtual Vinyl™',
      images: [
        '/assets/static/images/merchandise/nyla_veil_2_marrow_0.jpg',
        '/assets/static/images/merchandise/nyla_veil_2_marrow_1.jpg',
        '/assets/static/images/merchandise/nyla_veil_2_marrow_2.jpg',
      ],
      price: 125,
      sku: 'SS-ACC-004-RSD',
      description: `
<p><em><span style="font-weight: 400;">Marrow</span></em><span style="font-weight: 400;"> is a slow bleed - lush, cinematic, and unflinching in its honesty. Nyla Veil explores rebirth, heartbreak, and the body&rsquo;s memory through layered harmonies and orchestral soul. Each Virtual Vinyl&trade; includes </span><em><span style="font-weight: 400;">&ldquo;Beneath the Feathers&rdquo;</span></em><span style="font-weight: 400;"> &mdash; an NFC-enabled digital short that blends motion portraiture and spoken word, allowing fans to hear unreleased verses woven into the soundscape as Nyla&rsquo;s voice guides them through a dreamlike narrative.</span></p>
      `,
      stock: 3972,
      tags: ['1 OF 5000 AVAILABLE', 'Digital Collectible', 'Virtual Vinyl™'],
      labels: [
        {
          name: '1 OF 5000 AVAILABLE',
          color: '#fff',
          background: '#4cc8bc',
        },

        {
          name: 'Digital Collectible',
          color: '#fff',
          background: '#2c2e35',
        },
        {
          name: 'Virtual Vinyl™',
          color: '#fff',
          background: '#2c2e35',
        },
      ],
      options: {
        // colors: ['#FFF7A1', '#A1FFAF', '#A1A6FF', '#FFA1EB', '#FFA1A3'],
        // sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      parameters: [
        {
          name: 'specifications',
          value: [
            '12-inch pearl-white vinyl print',
            'NFC unlock to Beneath the Feathers short film',
            'High-res lossless audio + “Pulse Version” bonus track',
          ],
        },
        //  {
        //     name: 'vinyl',
        //     value: ['12-inch pearl-white vinyl print'],
        //   },
        //   {
        //     name: 'visuals',
        //     value: ['NFC unlock to Beneath the Feathers short film'],
        //   },
        //   {
        //     name: 'audio',
        //     value: ['High-res lossless audio + “Pulse Version” bonus track'],
        //   },
      ],
    },
  ],
];

const minLikes = 10;
const maxLikes = 200;
const dataGen = isoDateGenerator(1);

const content = [...Array(baseArtistData.length).keys()].map((artist, i) =>
  imagesData[i].map((image, j) => {
    if (typeof image === 'string' || Array.isArray(image)) {
      return {
        id: idGenerator(),
        images: Array.isArray(image) ? [...image] : [image],
        // title: shortCaptionsData[j],
        content: shortCaptionsData[j],
        date: dataGen.next().value,
        likes: randomNumberRange(minLikes, maxLikes),
        isLiked: getBool(),
      };
    } else {
      return {
        id: idGenerator(),
        video: {
          ...image,
        },
        // title: shortCaptionsData[j],
        content: shortCaptionsData[j],
        date: dataGen.next().value,
        likes: randomNumberRange(minLikes, maxLikes),
        isLiked: getBool(),
      };
    }
  }),
);

const chat = [...Array(baseArtistData.length).keys()].map((artist, i) => {
  if (!chatData[i]) return [];
  return [
    ...chatData[i].map((item, j) => {
      if (item.name === 'fan') {
        return {
          id: idGenerator(),
          userId: (i + 1).toString(),
          role: 'user',
          name: 'Maddie',
          surname: '',
          shortName: 'M',
          img: '',
          message: item.message,
          date: dataGen.next().value,
        };
      } else {
        return {
          id: idGenerator(),
          userId: baseArtistData[i].id,
          role: 'artist',
          name: baseArtistData[i].name,
          surname: baseArtistData[i].surname,
          shortName: baseArtistData[i].shortName ? baseArtistData[i].shortName : '',
          img: baseArtistData[i].image ? baseArtistData[i].image : '',
          message: item.message,
          date: dataGen.next().value,
        };
      }
    }),
  ];
});

const artistDetails = [
  ...baseArtistData.map((artist, i) => {
    return {
      ...baseArtistData[i],
      content: {
        items: [...(content[i] || [])],
        hasNextPage: true,
      },
      chat: {
        channelId: artist.id,
      },
      links: linksData ? { ...linksData[i] } : {},
      vault: [...(merchandiseData[i] || [])],
      // merchandise: [...(merchandiseData[i] || [])],
    };
  }),
];

// const artistsData = [
//   { ...artistDetails[0] },
//   { ...artistDetails[1] },
//   { ...artistDetails[2] },
//   { ...artistDetails[3] },
//   { ...artistDetails[4] },
// ];
const artists = [...artistDetails];

module.exports = {
  artists,
  chat,
  content,
  merchandiseData,
};
