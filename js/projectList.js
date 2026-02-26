export const projectInfo = [
  {
    link: "https://sikhessence.co.uk",
    image: "./images/sikh_essence.png",
    imageAlt: "Screenshot of Sikh Essence project homepage",
    title: "Sikh Essence",
    tools: ["React", "Vite", "Tailwind", "node"],
    toolColours: ["react", "vite", "tailwind", "node"],
    description: `Engineered a full-stack application utilising React for component based reusability, Vite for quick render speeds, and tailwind for consistent design. Focused on creating a consistent design across multiple devices. Created a backend to accept emails and provide both a way for me to access the emails, aswell as providing the user with a confirmation email.`,
  },

  {
    link: "https://jaydeep080805.eu.pythonanywhere.com/",
    image: "./images/todoey.png",
    imageAlt: "Screenshot of todoey front page",
    title: "Todoey",
    tools: ["Flask", "JavaScript", "CSS", "SQL"],
    toolColours: ["flask", "javascript", "css", "sql"],
    description: `Created an online to do list application using Flask, integrating CRUD operations on a database. Gained real world use of table relationships, authentication, themes, user profiles and hashing/salting passwords. Also used jinja for dynamic HTML rendering and SQLAlchemy for ORM management, allowing for greater control over tables.`,
  },

  {
    link: "https://jaydeep080805.github.io/dew-point/",
    image: "./images/dew_point.png",
    imageAlt: "Screenshot of dew point calculator front page",
    title: "Dew Point Calculator",
    tools: ["React", "JavaScript", "JSX"],
    toolColours: ["react", "javascript", "jsx"],
    description: `Created a React app to calculate the dew point provided with a temperature and relative humidity value. This projected helped me to quickly work out an approximate dew point for my rooms when trying to workout the humidity.`,
  },

  {
    link: "https://jaydeep080805.github.io/weather_app/",
    image: "./images/weather_app.png",
    imageAlt: "Screenshot of weather app front page",
    title: "Weather App",
    tools: ["JavaScript", "API", "CSS"],
    toolColours: ["javascript", "api", "css"],
    description: `Leveraged API's to create an online weather dashboard. The colours are dynamically updated to provdide the user with a quick overview of the current temperatures of an area of their choosing, provided through openweathermap.
                `,
  },

  {
    link: "#",
    image: "./images/portfolio.png",
    imageAlt: "Screenshot of weather app front page",
    title: "Porfolio (this site)",
    tools: ["JavaScript", "Express", "Jest", "Supertest", "API"],
    toolColours: ["javascript", "express", "jest", "supertest", "api"],
    description: `Created a portfolio app utilising DRY code practices, test-driven code and responsive layout. The site features dynamic data rendering from JavaScript ensuring code remains maintainable and readable. Developed an Express.js backend to connect to Brevo API and SMTP servers to ensure reliable email delivery. Securely stored API keys in .env files to maintain security.   
                `,
  },

  {
    link: "https://github.com/jaydeep080805/unity-project-final",
    image: "./images/game.png",
    imageAlt: "Screenshot of game in C# game in progress",
    title: "C# Game",
    tools: ["C#", "Unity", "TestRunner"],
    toolColours: ["c-sharp", "unity", "testrunner"],
    description: `Created a mini game in Unity consisting of multiple levels, multiple input options, saved user preferences through I/O operations, and a score based system for progression. Created multiple canvases utilising prefabs to create a maintainable and consistent user experience.
                `,
  },

  {
    link: "https://github.com/jaydeep080805/accom_room_tracker",
    image: "./images/python.png",
    imageAlt: "Python logo image",
    title: "Selenium Script",
    tools: ["Python", "Selenium", "Scraping"],
    toolColours: ["python", "selenium", "scraping"],
    description: `Created a mini selenium script to check the current status of my accomodation room to track when there was an update to the amount of guests staying in the flat. utilised selenium web driver to perform mulitiple actions on the page. Cross-checked the current state of the flat with the .txt file before sending an email.`,
  },
];
