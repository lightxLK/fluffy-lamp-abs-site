export interface Director {
  name: string;
  role: string;
  bio: string;
  quote?: string;
  image: string;
}

export const TRIBUTE_DIRECTOR: Director = {
  name: 'Lt. Ved Prakash Agarwal',
  role: '"Vedu Babu Hansiwala", Founder',
  bio: 'In 1972, a young man left Hansi, Haryana with nothing but determination and a few annas in his pocket. He arrived in Kolkata seeking not wealth, but dignity, walking miles across the city, often working days without food. Through grit he earned trust first as a broker, then a trader, and eventually as the owner of the very re-rolling mill where he once laboured. From walking barefoot to owning mills, his story is the steel in our name and the strength in our hearts.',
  image: '/board-members/Late Ved Prakash Agarwal.webp',
};

export const DIRECTORS: Director[] = [
  {
    name: 'Mr. Anil Kumar Agarwal',
    role: 'Founder & Chairman',
    bio: 'The guiding force bringing over three decades of expertise in the steel industry. His principles of integrity, relationships, and quality form the foundation on which ABS stands today.',
    quote: 'Work done with honesty and heart lasts longer than any structure we build.',
    image: '/board-members/Anil Kumar Agarwal.webp',
  },
  {
    name: 'Mr. Virendra Agarwal',
    role: 'Chief Executive Officer',
    bio: 'Steers ABS strategy across manufacturing, sales, and vision, building trust that turns steel from a product into a promise.',
    quote:
      'Steel is more than a product, it’s a promise of strength, reliability, and responsibility.',
    image: '/board-members/Virendra Agarwal.webp',
  },
  {
    name: 'Mr. Vivek Agarwal',
    role: 'Chief Financial Officer',
    bio: 'Manages ABS’s financial ecosystem with a meticulous eye for numbers, ensuring fiscal transparency, sustainability, and long-term stability.',
    quote:
      'Strong finances are about the responsibility that ensures every decision strengthens the foundation for generations ahead.',
    image: '/board-members/Vivek Agarwal.webp',
  },
  {
    name: 'Mr. Balwant Roy Agarwal',
    role: 'Head of Production',
    bio: 'A stalwart in manufacturing excellence, overseeing all plant operations and production quality across every rolling and slitting line.',
    quote: 'Every sheet and shutter we create carries the pride of Indian craftsmanship.',
    image: '/board-members/Balwant Roy Agarwal.webp',
  },
  {
    name: 'Ms. Komal Agarwal',
    role: 'Head of Marketing & Data Analysis · Fabrica',
    bio: 'The creative and analytical heartbeat of ABS, leading marketing strategy and heading the Fabrica division, turnkey automated gates and architectural steelwork.',
    quote: 'At ABS, we don’t just sell steel, we communicate strength, trust, and purpose.',
    image: '/board-members/Komal Agarwal.webp',
  },
];
