import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from './models/Question.js';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await Question.deleteMany();

    const questions = [
      // ================= WEB DEV =================
      {
        question: 'What does HTML stand for?',
        options: ['Hyper Text Markup Language', 'High Text Machine Language', 'Hyperlinks Text Mark Language', 'Home Tool Markup Language'],
        answer: 'Hyper Text Markup Language',
        category: 'Web Dev',
        difficulty: 'Easy',
      },
      {
        question: 'Which HTML tag is used to create a hyperlink?',
        options: ['<link>', '<a>', '<href>', '<url>'],
        answer: '<a>',
        category: 'Web Dev',
        difficulty: 'Easy',
      },
      {
        question: 'Which CSS property controls text color?',
        options: ['font-style', 'color', 'text-color', 'background-color'],
        answer: 'color',
        category: 'Web Dev',
        difficulty: 'Easy',
      },
      {
        question: 'Which JavaScript keyword is used to declare a constant?',
        options: ['var', 'let', 'const', 'static'],
        answer: 'const',
        category: 'Web Dev',
        difficulty: 'Easy',
      },
      {
        question: 'Which HTTP method is used to fetch data?',
        options: ['POST', 'PUT', 'GET', 'DELETE'],
        answer: 'GET',
        category: 'Web Dev',
        difficulty: 'Easy',
      },

      {
        question: 'Which React hook is used to manage state?',
        options: ['useEffect', 'useState', 'useRef', 'useContext'],
        answer: 'useState',
        category: 'Web Dev',
        difficulty: 'Medium',
      },
      {
        question: 'What is JSX?',
        options: ['JavaScript XML', 'JSON XML', 'Java Syntax Extension', 'JavaScript Extension'],
        answer: 'JavaScript XML',
        category: 'Web Dev',
        difficulty: 'Medium',
      },
      {
        question: 'Which CSS layout system is one-dimensional?',
        options: ['Grid', 'Flexbox', 'Float', 'Position'],
        answer: 'Flexbox',
        category: 'Web Dev',
        difficulty: 'Medium',
      },
      {
        question: 'What does REST stand for?',
        options: ['Representational State Transfer', 'Remote Execution System', 'Random State Transfer', 'Real State Technology'],
        answer: 'Representational State Transfer',
        category: 'Web Dev',
        difficulty: 'Medium',
      },
      {
        question: 'Which status code means "Unauthorized"?',
        options: ['200', '201', '401', '500'],
        answer: '401',
        category: 'Web Dev',
        difficulty: 'Medium',
      },

      {
        question: 'Which database is NoSQL?',
        options: ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle'],
        answer: 'MongoDB',
        category: 'Web Dev',
        difficulty: 'Hard',
      },
      {
        question: 'JWT is mainly used for?',
        options: ['Encryption', 'Authentication', 'Styling', 'Database'],
        answer: 'Authentication',
        category: 'Web Dev',
        difficulty: 'Hard',
      },
      {
        question: 'Which lifecycle method runs after first render (class component)?',
        options: ['componentWillMount', 'componentDidMount', 'componentWillUpdate', 'render'],
        answer: 'componentDidMount',
        category: 'Web Dev',
        difficulty: 'Hard',
      },
      {
        question: 'Which protocol secures HTTP?',
        options: ['FTP', 'SSL/TLS', 'SSH', 'SMTP'],
        answer: 'SSL/TLS',
        category: 'Web Dev',
        difficulty: 'Hard',
      },
      {
        question: 'Which command initializes a new npm project?',
        options: ['npm start', 'npm install', 'npm init', 'npm build'],
        answer: 'npm init',
        category: 'Web Dev',
        difficulty: 'Hard',
      },

      // ================= MATH =================
      {
        question: 'What is 15 × 4?',
        options: ['60', '45', '30', '75'],
        answer: '60',
        category: 'Math',
        difficulty: 'Easy',
      },
      {
        question: 'Square root of 81?',
        options: ['7', '8', '9', '10'],
        answer: '9',
        category: 'Math',
        difficulty: 'Easy',
      },
      {
        question: 'What is 20% of 200?',
        options: ['20', '40', '60', '80'],
        answer: '40',
        category: 'Math',
        difficulty: 'Easy',
      },
      {
        question: 'Value of π (approx)?',
        options: ['3.14', '2.17', '1.41', '4.13'],
        answer: '3.14',
        category: 'Math',
        difficulty: 'Easy',
      },
      {
        question: 'What is 7²?',
        options: ['14', '21', '49', '77'],
        answer: '49',
        category: 'Math',
        difficulty: 'Easy',
      },

      {
        question: 'What is the LCM of 4 and 6?',
        options: ['6', '8', '12', '24'],
        answer: '12',
        category: 'Math',
        difficulty: 'Medium',
      },
      {
        question: 'Solve: 2x + 6 = 14',
        options: ['2', '3', '4', '5'],
        answer: '4',
        category: 'Math',
        difficulty: 'Medium',
      },
      {
        question: 'Area of rectangle (l=5, b=4)?',
        options: ['9', '18', '20', '25'],
        answer: '20',
        category: 'Math',
        difficulty: 'Medium',
      },
      {
        question: 'What is 3/4 as decimal?',
        options: ['0.25', '0.5', '0.75', '1.25'],
        answer: '0.75',
        category: 'Math',
        difficulty: 'Medium',
      },
      {
        question: '10³ equals?',
        options: ['30', '100', '1000', '300'],
        answer: '1000',
        category: 'Math',
        difficulty: 'Medium',
      },

      // ================= GK =================
      {
        question: 'Capital of India?',
        options: ['Mumbai', 'Delhi', 'Chennai', 'Kolkata'],
        answer: 'Delhi',
        category: 'GK',
        difficulty: 'Easy',
      },
      {
        question: 'Who is known as Father of the Nation?',
        options: ['Nehru', 'Subhash Bose', 'Gandhi', 'Bhagat Singh'],
        answer: 'Gandhi',
        category: 'GK',
        difficulty: 'Easy',
      },
      {
        question: 'Largest planet in our solar system?',
        options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
        answer: 'Jupiter',
        category: 'GK',
        difficulty: 'Easy',
      },
      {
        question: 'National animal of India?',
        options: ['Lion', 'Elephant', 'Tiger', 'Leopard'],
        answer: 'Tiger',
        category: 'GK',
        difficulty: 'Easy',
      },
      {
        question: 'How many continents are there?',
        options: ['5', '6', '7', '8'],
        answer: '7',
        category: 'GK',
        difficulty: 'Easy',
      },
    ];

    await Question.insertMany(questions);
    console.log('✅ Genuine questions seeded successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
