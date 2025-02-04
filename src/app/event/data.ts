import { StaticImageData } from "next/image";
import event_photo from '@/assets/images/event_photo.jpg'
import profile_photo from '@/assets/images/profile.jpeg'
import image1 from '@/assets/images/image1.jpg'
import image2 from '@/assets/images/image2.jpg'
import image3 from '@/assets/images/image3.jpg'
import image4 from '@/assets/images/image4.jpg'

export interface MediaItem {
  type: 'image' | 'video';
  url: string | StaticImageData;
  thumbnail?: StaticImageData;  // For video thumbnails
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: StaticImageData;
}

export interface Comment {
  id: string;
  author: User;  // Changed to use User interface
  content: string;
  createdAt: string;
  likes: number;
  replies?: Comment[];
}

export interface Event {
  id: number;
  title: string;
  date: string;
  location: {
    name: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    mapEmbedUrl: string; // Stores complete iframe HTML
  };
  media: MediaItem[];  // Array of media items
  author: {
    name: string;
    email: string;
    avatar: StaticImageData;
  };
  description: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  comments: Comment[];  // Updated to use new Comment interface
}

// Add current user data
export const currentUser: User = {
  id: 'current-user',
  name: 'John Doe',
  email: 'email@example.com',
  avatar: profile_photo
};

export const events: Event[] = [
  {
    id: 1,
    title: "Neon Future Tech Conference 2025",
    date: "25 January at 10:05",
    location: {
      name: "AcePlus Solutions Company Limited.Co.Ltd.",
      address: "Building 19, MICT Park, Yangon, Myanmar",
      coordinates: {
        lat: 16.8565544,
        lng: 96.120903
      },
      mapEmbedUrl: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3868.234145708889!2d96.12540327520964!3d16.850453783948083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c195357ede6a39%3A0x2578df713e3b85c7!2sBuilding%2019%2C%20MICT%20Park!5e1!3m2!1sen!2smm!4v1738634950816!5m2!1sen!2smm" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
    },
    media: [

      {
        type: 'image',
        url: image3,
      },
      {
        type: 'image',
        url: image4,
      },
      {
        type: 'video',
        url: 'https://www.youtube.com/watch?v=Gv7torZn5lM',
        thumbnail: event_photo,
      },
      {
        type: 'image',
        url: event_photo,
      },
      {
        type: 'image',
        url: event_photo,
      },
      {
        type: 'image',
        url: event_photo,
      },
      {
        type: 'video',
        url: 'https://www.youtube.com/watch?v=Gv7torZn5lM',
        thumbnail: event_photo,
      },
      {
        type: 'image',
        url: event_photo,
      },
      {
        type: 'image',
        url: image1,
      },
      {
        type: 'image',
        url: image2,
      },
    ],
    author: {
      name: "John Doe",
      email: "email@example.com",
      avatar: profile_photo,
    },
    description: "## About The Event\nDive into the future of *AI*, *blockchain*, and *quantum computing* at the biggest tech event of the year.\n\nJoin industry leaders and innovators for groundbreaking discussions on emerging technologies. Our keynote speakers include **Dr. Sarah Chen** from [Quantum Labs](https://quantum.example.com) and **Michael Zhang** from [Future AI Institute](https://ai.example.com).\n\n## Event Highlights\n- Live demonstrations of next-gen quantum computers with `quantum-sdk-v2`\n- Interactive AI workshops using *machine learning* techniques\n- Blockchain implementation strategies for `web3` applications\n- Networking opportunities with industry pioneers\n\n## Technical Sessions\n1. Advanced Neural Networks in Practice\n2. Quantum Computing: Beyond Theory\n3. Blockchain Scalability Solutions\n\nThis year's conference focuses on practical applications and real-world impact of these transformative technologies. [Learn more →](https://conference.example.com)\n\n*Don't miss this opportunity to be part of the future.*",
    engagement: {
      likes: 215000,
      comments: 150,
      shares: 21,
    },
    comments: [
      {
        id: '1',
        author: {
          id: 'user-1',
          name: 'Thal Zu Moe',
          email: 'thalzumoe@example.com',
          avatar: profile_photo
        },
        content: 'မှန်ပြောတာအလုအတွက် ဒီထက်ပိုအောင်ပြင်ပါဦး',
        createdAt: '2024-03-21T15:30:00Z',
        likes: 14,
      },
      {
        id: '2',
        author: {
          id: 'user-2',
          name: 'Nay Nay Noe',
          email: 'naynaynoe@example.com',
          avatar: profile_photo
        },
        content: '145စီးတော\nကတ်မတွေ ခွင်လည်းတုံးတောင်ပတ်တားပြီး\nစလည်းကပ်ထားတယ်\nမသိလို့ပဲကဆိုးရလည်း\nအခုပါဲပြောတယ်\nယာဉ်မောင်းလည်း သိအောင်ကောင်းတယ်\nသာခု သာခု သာခုပါရှင်',
        createdAt: '2024-03-21T14:00:00Z',
        likes: 17,
      },
      {
        id: '3',
        author: {
          id: 'user-3',
          name: 'YBS လမ်းညွှန်',
          email: 'ybs@example.com',
          avatar: profile_photo
        },
        content: '💝ယနေ့ပြုပြင်ပြီးစီးနှိုင်ရန်ဆောင်ရွက်နေသော အမှတ်စီးရင်ခရိုက်ရှိမူရပါတယ်။။\nYBS 28(5N-8033)\nYBS 61(6P-6757)\nYBS 89(5N-8129)\nYBS 107(5N-6064)\nYBS 145(5N-4709)',
        createdAt: '2024-03-21T13:00:00Z',
        likes: 14,
      },
      {
        id: '4',
        author: {
          id: 'user-3',
          name: 'YBS လမ်းညွှန်',
          email: 'ybs@example.com',
          avatar: profile_photo
        },
        content: '💝ယနေ့ပြုပြင်ပြီးစီးနှိုင်ရန်ဆောင်ရွက်နေသော အမှတ်စီးရင်ခရိုက်ရှိမူရပါတယ်။။\nYBS 28(5N-8033)\nYBS 61(6P-6757)\nYBS 89(5N-8129)\nYBS 107(5N-6064)\nYBS 145(5N-4709)',
        createdAt: '2024-03-21T13:00:00Z',
        likes: 14,
      },
      {
        id: '5',
        author: {
          id: 'user-3',
          name: 'YBS လမ်းညွှန်',
          email: 'ybs@example.com',
          avatar: profile_photo
        },
        content: '💝ယနေ့ပြုပြင်ပြီးစီးနှိုင်ရန်ဆောင်ရွက်နေသော အမှတ်စီးရင်ခရိုက်ရှိမူရပါတယ်။။\nYBS 28(5N-8033)\nYBS 61(6P-6757)\nYBS 89(5N-8129)\nYBS 107(5N-6064)\nYBS 145(5N-4709)',
        createdAt: '2024-03-21T13:00:00Z',
        likes: 14,
      }
    ],
  },
  {
    id: 2,
    title: "Neon Future Tech Conference 2025",
    date: "25 January at 10:05",
    location: {
      name: "AcePlus Solutions Company Limited.Co.Ltd.",
      address: "Building 19, MICT Park, Yangon, Myanmar",
      coordinates: {
        lat: 16.8565544,
        lng: 96.120903
      },
      mapEmbedUrl: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3868.234145708889!2d96.12540327520964!3d16.850453783948083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c195357ede6a39%3A0x2578df713e3b85c7!2sBuilding%2019%2C%20MICT%20Park!5e1!3m2!1sen!2smm!4v1738634950816!5m2!1sen!2smm" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
    },
    media: [

      {
        type: 'image',
        url: image3,
      },
      {
        type: 'image',
        url: image4,
      },
      {
        type: 'video',
        url: 'https://www.youtube.com/watch?v=Gv7torZn5lM',
        thumbnail: event_photo,
      },
      {
        type: 'image',
        url: event_photo,
      },
      {
        type: 'image',
        url: event_photo,
      },
      {
        type: 'image',
        url: event_photo,
      },
      {
        type: 'video',
        url: 'https://www.youtube.com/watch?v=Gv7torZn5lM',
        thumbnail: event_photo,
      },
      {
        type: 'image',
        url: event_photo,
      },
      {
        type: 'image',
        url: image1,
      },
      {
        type: 'image',
        url: image2,
      },
    ],
    author: {
      name: "John Doe",
      email: "email@example.com",
      avatar: profile_photo,
    },
    description: "## About The Event\nDive into the future of *AI*, *blockchain*, and *quantum computing* at the biggest tech event of the year.\n\nJoin industry leaders and innovators for groundbreaking discussions on emerging technologies. Our keynote speakers include **Dr. Sarah Chen** from [Quantum Labs](https://quantum.example.com) and **Michael Zhang** from [Future AI Institute](https://ai.example.com).\n\n## Event Highlights\n- Live demonstrations of next-gen quantum computers with `quantum-sdk-v2`\n- Interactive AI workshops using *machine learning* techniques\n- Blockchain implementation strategies for `web3` applications\n- Networking opportunities with industry pioneers\n\n## Technical Sessions\n1. Advanced Neural Networks in Practice\n2. Quantum Computing: Beyond Theory\n3. Blockchain Scalability Solutions\n\nThis year's conference focuses on practical applications and real-world impact of these transformative technologies. [Learn more →](https://conference.example.com)\n\n*Don't miss this opportunity to be part of the future.*",
    engagement: {
      likes: 215000,
      comments: 150,
      shares: 21,
    },
    comments: [],
  },
  {
    id: 3,
    title: "Neon Future Tech Conference 2025",
    date: "25 January at 10:05",
    location: {
      name: "AcePlus Solutions Company Limited.Co.Ltd.",
      address: "Building 19, MICT Park, Yangon, Myanmar",
      coordinates: {
        lat: 16.8565544,
        lng: 96.120903
      },
      mapEmbedUrl: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3868.234145708889!2d96.12540327520964!3d16.850453783948083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c195357ede6a39%3A0x2578df713e3b85c7!2sBuilding%2019%2C%20MICT%20Park!5e1!3m2!1sen!2smm!4v1738634950816!5m2!1sen!2smm" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
    },
    media: [

      {
        type: 'image',
        url: image3,
      },
      {
        type: 'image',
        url: image4,
      },
      {
        type: 'video',
        url: 'https://www.youtube.com/watch?v=Gv7torZn5lM',
        thumbnail: event_photo,
      },
      {
        type: 'image',
        url: event_photo,
      },
      {
        type: 'image',
        url: event_photo,
      },
      {
        type: 'image',
        url: event_photo,
      },
      {
        type: 'video',
        url: 'https://www.youtube.com/watch?v=Gv7torZn5lM',
        thumbnail: event_photo,
      },
      {
        type: 'image',
        url: event_photo,
      },
      {
        type: 'image',
        url: image1,
      },
      {
        type: 'image',
        url: image2,
      },
    ],
    author: {
      name: "John Doe",
      email: "email@example.com",
      avatar: profile_photo,
    },
    description: "## About The Event\nDive into the future of *AI*, *blockchain*, and *quantum computing* at the biggest tech event of the year.\n\nJoin industry leaders and innovators for groundbreaking discussions on emerging technologies. Our keynote speakers include **Dr. Sarah Chen** from [Quantum Labs](https://quantum.example.com) and **Michael Zhang** from [Future AI Institute](https://ai.example.com).\n\n## Event Highlights\n- Live demonstrations of next-gen quantum computers with `quantum-sdk-v2`\n- Interactive AI workshops using *machine learning* techniques\n- Blockchain implementation strategies for `web3` applications\n- Networking opportunities with industry pioneers\n\n## Technical Sessions\n1. Advanced Neural Networks in Practice\n2. Quantum Computing: Beyond Theory\n3. Blockchain Scalability Solutions\n\nThis year's conference focuses on practical applications and real-world impact of these transformative technologies. [Learn more →](https://conference.example.com)\n\n*Don't miss this opportunity to be part of the future.*",
    engagement: {
      likes: 215000,
      comments: 150,
      shares: 21,
    },
    comments: [],
  },
]; 