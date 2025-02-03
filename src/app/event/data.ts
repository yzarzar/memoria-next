import { StaticImageData } from "next/image";
import event_photo from '@/assets/images/event_photo.jpg'
import profile_photo from '@/assets/images/profile.jpeg'

export interface MediaItem {
  type: 'image' | 'video';
  url: string | StaticImageData;
  thumbnail?: StaticImageData;  // For video thumbnails
}

export interface Event {
  id: number;
  title: string;
  date: string;
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
}

export const events: Event[] = [
  {
    id: 1,
    title: "Neon Future Tech Conference 2025",
    date: "25 January at 10:05",
    media: [
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
    ],
    author: {
      name: "John Doe",
      email: "email@example.com",
      avatar: profile_photo,
    },
    description: "Dive into the future of AI, blockchain, and quantum computing at the biggest tech event of the year. Join industry leaders and innovators for groundbreaking discussions on emerging technologies. Dive into the future of AI, blockchain, and quantum computing at the biggest tech event of the year. Join industry leaders and innovators for groundbreaking discussions on emerging technologies. Dive into the future of AI, blockchain, and quantum computing at the biggest tech event of the year. Join industry leaders and innovators for groundbreaking discussions on emerging technologies. Dive into the future of AI, blockchain, and quantum computing at the biggest tech event of the year. Join industry leaders and innovators for groundbreaking discussions on emerging technologies. Dive into the future of AI, blockchain, and quantum computing at the biggest tech event of the year. Join industry leaders and innovators for groundbreaking discussions on emerging technologies. Dive into the future of AI, blockchain, and quantum computing at the biggest tech event of the year. Join industry leaders and innovators for groundbreaking discussions on emerging technologies. Dive into the future of AI, blockchain, and quantum computing at the biggest tech event of the year. Join industry leaders and innovators for groundbreaking discussions on emerging technologies. Dive into the future of AI, blockchain, and quantum computing at the biggest tech event of the year. Join industry leaders and innovators for groundbreaking discussions on emerging technologies. Dive into the future of AI, blockchain, and quantum computing at the biggest tech event of the year. Join industry leaders and innovators for groundbreaking discussions on emerging technologies.",
    engagement: {
      likes: 215000,
      comments: 150,
      shares: 21,
    },
  },
  {
    id: 2,
    title: "Global AI Summit 2025",
    date: "15 March at 14:00",
    media: [
      {
        type: 'image',
        url: event_photo,
      },
      {
        type: 'video',
        url: 'https://www.youtube.com/watch?v=YkCDVn3_wiw',
        thumbnail: event_photo,
      },
      {
        type: 'image',
        url: event_photo,
      },
    ],
    author: {
      name: "Sarah Chen",
      email: "sarah.chen@example.com",
      avatar: profile_photo,
    },
    description: "Experience the world's premier AI conference featuring breakthrough research presentations, workshops, and networking with leading AI researchers and practitioners.",
    engagement: {
      likes: 189000,
      comments: 234,
      shares: 45,
    },
  },
  {
    id: 3,
    title: "Blockchain Revolution Summit",
    date: "5 April at 09:30",
    media: [
      {
        type: 'image',
        url: event_photo,
      },
      {
        type: 'video',
        url: 'https://www.youtube.com/watch?v=QFc7jXZ2pdE',
        thumbnail: event_photo,
      },
      {
        type: 'image',
        url: event_photo,
      },
    ],
    author: {
      name: "Michael Johnson",
      email: "m.johnson@example.com",
      avatar: profile_photo,
    },
    description: "Explore the latest developments in blockchain technology, DeFi, and Web3. Connect with industry pioneers and discover the future of decentralized systems.",
    engagement: {
      likes: 156000,
      comments: 180,
      shares: 32,
    },
  },
  {
    id: 4,
    title: "Quantum Computing Expo 2025",
    date: "20 May at 11:00",
    media: [
      {
        type: 'image',
        url: event_photo,
      },
      {
        type: 'video',
        url: 'https://www.youtube.com/watch?v=rHjolP34pyc',
        thumbnail: event_photo,
      },
      {
        type: 'image',
        url: event_photo,
      },
    ],
    author: {
      name: "Emily Williams",
      email: "e.williams@example.com",
      avatar: profile_photo,
    },
    description: "Witness the quantum revolution firsthand with demonstrations of cutting-edge quantum computers and discussions on their practical applications.",
    engagement: {
      likes: 142000,
      comments: 195,
      shares: 28,
    },
  },
  {
    id: 5,
    title: "Cybersecurity World Conference",
    date: "10 June at 14:15",
    media: [
      {
        type: 'image',
        url: event_photo,
      },
      {
        type: 'video',
        url: 'https://www.youtube.com/watch?v=VMHCyzTP4oE',
        thumbnail: event_photo,
      },
      {
        type: 'image',
        url: event_photo,
      },
    ],
    author: {
      name: "David Kim",
      email: "d.kim@example.com",
      avatar: profile_photo,
    },
    description: "Join top security experts to discuss emerging threats, advanced protection strategies, and the future of digital security in an interconnected world.",
    engagement: {
      likes: 167000,
      comments: 220,
      shares: 38,
    },
  },
  {
    id: 6,
    title: "IoT Innovation Summit",
    date: "3 July at 13:45",
    media: [
      {
        type: 'image',
        url: event_photo,
      },
      {
        type: 'video',
        url: 'https://www.youtube.com/watch?v=5bevi_0v6wU',
        thumbnail: event_photo,
      },
      {
        type: 'image',
        url: event_photo,
      },
    ],
    author: {
      name: "Lisa Anderson",
      email: "l.anderson@example.com",
      avatar: profile_photo,
    },
    description: "Discover the latest in IoT technology, smart cities, and connected devices. Learn how IoT is transforming industries and shaping our future.",
    engagement: {
      likes: 134000,
      comments: 165,
      shares: 25,
    },
  },
  {
    id: 7,
    title: "Digital Transformation Forum",
    date: "22 August at 09:30",
    media: [
      {
        type: 'image',
        url: event_photo,
      },
      {
        type: 'video',
        url: 'https://www.youtube.com/watch?v=naQ0RuXB3fI',
        thumbnail: event_photo,
      },
      {
        type: 'image',
        url: event_photo,
      },
    ],
    author: {
      name: "Robert Martinez",
      email: "r.martinez@example.com",
      avatar: profile_photo,
    },
    description: "Learn how leading organizations are leveraging digital technologies to transform their operations and create new value for customers.",
    engagement: {
      likes: 145000,
      comments: 178,
      shares: 29,
    },
  },
  {
    id: 8,
    title: "Cloud Computing Summit 2025",
    date: "15 September at 10:00",
    media: [
      {
        type: 'image',
        url: event_photo,
      },
      {
        type: 'video',
        url: 'https://www.youtube.com/watch?v=nxqA3VHKE-s&t=1456s',
        thumbnail: event_photo,
      },
      {
        type: 'image',
        url: event_photo,
      },
    ],
    author: {
      name: "Anna Thompson",
      email: "a.thompson@example.com",
      avatar: profile_photo,
    },
    description: "Explore the latest trends in cloud computing, serverless architecture, and multi-cloud strategies with industry experts.",
    engagement: {
      likes: 178000,
      comments: 198,
      shares: 35,
    },
  },
  {
    id: 9,
    title: "5G & Beyond Conference",
    date: "8 October at 11:30",
    media: [
      {
        type: 'image',
        url: event_photo,
      },
      {
        type: 'video',
        url: 'https://www.youtube.com/watch?v=FgzyLoSkL5k',
        thumbnail: event_photo,
      },
      {
        type: 'image',
        url: event_photo,
      },
    ],
    author: {
      name: "James Wilson",
      email: "j.wilson@example.com",
      avatar: profile_photo,
    },
    description: "Discover how 5G and future communication technologies are enabling new possibilities in connectivity and digital experiences.",
    engagement: {
      likes: 156000,
      comments: 187,
      shares: 31,
    },
  },
  {
    id: 10,
    title: "Future of Work Summit",
    date: "12 November at 15:00",
    media: [
      {
        type: 'image',
        url: event_photo,
      },
      {
        type: 'video',
        url: 'https://www.youtube.com/watch?v=DpQQi2scsHo&t=1s',
        thumbnail: event_photo,
      },
      {
        type: 'image',
        url: event_photo,
      },
    ],
    author: {
      name: "Sophie Brown",
      email: "s.brown@example.com",
      avatar: profile_photo,
    },
    description: "Explore how AI, automation, and digital transformation are reshaping the workplace and creating new opportunities for innovation.",
    engagement: {
      likes: 189000,
      comments: 225,
      shares: 42,
    },
  },
]; 