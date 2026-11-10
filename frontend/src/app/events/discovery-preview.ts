interface DiscoveryExample {
  readonly category: string;
  readonly title: string;
  readonly when: string;
  readonly venue: string;
}

interface DiscoverySection {
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly empty: string;
  readonly examples: readonly DiscoveryExample[];
}

// Fictional fixtures for local development, never mixed into the live event feed.
export const discoverySections: readonly DiscoverySection[] = [
  {
    key: 'hottest',
    title: 'Hottest events',
    description: 'Events gaining attention this week.',
    empty: 'Trending events will appear here once there is enough activity.',
    examples: [
      {
        category: 'Music',
        title: 'Jazz in the Junction',
        when: 'Fri · 7:30 p.m.',
        venue: 'Junction Music Hall',
      },
      {
        category: 'Markets',
        title: 'Winter Makers Market',
        when: 'Sat · 10:00 a.m.',
        venue: 'West End Market Hall',
      },
      {
        category: 'Arts',
        title: 'Indie Film Night',
        when: 'Sat · 8:00 p.m.',
        venue: 'Neighbourhood Cinema',
      },
    ],
  },
  {
    key: 'nearby',
    title: 'Popular near you',
    description: 'Popular picks in your area.',
    empty: 'Local picks will appear here when location and popularity data are available.',
    examples: [
      {
        category: 'Outdoors',
        title: 'High Park Morning Walk',
        when: 'Sat · 9:00 a.m.',
        venue: 'High Park main entrance',
      },
      {
        category: 'Community',
        title: 'Neighbourhood Potluck',
        when: 'Sun · 5:00 p.m.',
        venue: 'Community Hall',
      },
      {
        category: 'Sports',
        title: 'Drop-in Badminton',
        when: 'Sun · 2:00 p.m.',
        venue: 'West End Recreation Centre',
      },
    ],
  },
  {
    key: 'personal',
    title: 'Things you might like',
    description: 'Picks matched to your interests.',
    empty: 'Personalized picks will appear here once you can set your interests.',
    examples: [
      {
        category: 'Arts',
        title: 'Intro to Handbuilding',
        when: 'Thu · 6:30 p.m.',
        venue: 'Clay Studio',
      },
      {
        category: 'Food & drink',
        title: 'Fresh Pasta Workshop',
        when: 'Sat · 3:00 p.m.',
        venue: 'Teaching Kitchen',
      },
      {
        category: 'Arts',
        title: 'Gallery Sketch Walk',
        when: 'Sun · 1:00 p.m.',
        venue: 'Community Gallery',
      },
    ],
  },
];
