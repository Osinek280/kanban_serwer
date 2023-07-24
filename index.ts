import  express, { Express, Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

const app: Express = express();
app.use(cors({origin: '*'}))
app.use(express.json());

const PORT = process.env.PORT || 8000;

interface User {
  id: string;
  username: string;
  login: string;
  password: string;
}

const users: User[] = [
  { id: '397d266d-10eb-4936-954b-33000347858d', username: "Smith", login: "smithy23", password: "monkey2135" },
  { id: 'c1b9d0d3-2797-4260-a942-f55074141049', username: "Doe", login: "doe_john", password: "monkasLOL" },
  { id: 'd8973c6c-b0b1-430e-a0b7-10a26fa39cf1', username: "Smith", login: "smithy_sm", password: "p@ssw0rd" },
  { id: '9a44d0ef-ac2e-4ca0-bade-3f936ff4397d', username: "Williams", login: "will_777", password: "qwerty123" },
  { id: '9ff391f3-11fa-407e-9e21-c048428c441e', username: "Johnson", login: "j_johnson", password: "letmein" },
  { id: '558f114f-62b6-47a1-86bb-8e7cfe77db39', username: "Brown", login: "brownie22", password: "password123" },
];

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  subtasks: string[];
}

interface File {
  id: string;
  name: string;
  ownerId: string;
  sections: string[];
  tasks: Task[];
}

const files: File[] = [
  {
    id: '2c343748-dc0c-43eb-8788-3388e7352100',
    name: 'School',
    ownerId: '397d266d-10eb-4936-954b-33000347858d',
    sections: ['To do', 'In progress', 'Done'],
    tasks: [
      {
        id: '43a6b07d-b43b-4798-b520-7060be98af31',
        title: 'Study for math test',
        description: 'Review chapters 1-5 and solve practice problems.',
        category: 'To do',
        priority: 'medium',
        subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        id: '41568a75-7c62-4f57-8d8e-cd5d2b277365',
        title: 'Write essay for English class',
        description: 'Choose a topic and draft an outline for the essay.',
        category: 'To do',
        priority: 'high',
        subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        id: 'f07f2c38-3c40-48b1-adf2-e9c1197a1db6',
        title: 'Complete science experiment',
        description: 'Gather materials and conduct the experiment following the procedure.',
        category: 'In progress',
        priority: 'medium',
        subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        id: '0098b3f7-6b2e-4ff9-afa4-5b0bc84ba5a6',
        title: 'Prepare presentation for history project',
        description: 'Research the topic and create slides for the presentation.',
        category: 'In progress',
        priority: 'low',
        subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        id: '40258d90-0fbc-4a82-8a62-61e4a4323b21',
        title: 'Submit homework assignments',
        description: 'Complete and submit the assigned homework tasks.',
        category: 'Done',
        priority: 'low',
        subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        id: '6ace13c6-ab11-4ce4-b148-276e2608a280',
        title: 'Review study notes for upcoming quiz',
        description: 'Go through the notes and summarize key concepts.',
        category: 'Done',
        priority: 'medium',
        subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
    ],
  },
  {
    id: 'c301d844-5f33-4268-a3aa-7c6b9ed394ee',
    name: 'Work',
    ownerId: '397d266d-10eb-4936-954b-33000347858d',
    sections: ['To do', 'In progress', 'Done'],
    tasks: [
      {
        id: 'ac24fb88-203f-4ca3-90fc-bbe40d48cb92',
        title: 'Prepare monthly report',
        description: 'Gather data and analyze performance to create the report.',
        category: 'To do',
        priority: 'high',
        subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        id: 'e30abb3d-7c02-4cf9-994c-34bb851eb076',
        title: 'Attend team meeting',
        description: 'Participate in the weekly team meeting and provide updates.',
        category: 'To do',
        priority: 'medium',
        subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        id: 'c4c333de-60db-4e80-8223-35008eefdcd7',
        title: 'Follow up with clients',
        description: 'Contact clients to address their concerns and provide assistance.',
        category: 'In progress',
        priority: 'medium',
        subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        id: '1d656304-35e4-40ca-bdf8-1421600509b3',
        title: 'Develop new feature for the app',
        description: 'Write code and perform testing for the new feature implementation.',
        category: 'In progress',
        priority: 'high',
        subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        id: 'f752f56e-23d1-4987-9299-6f4f03b8482f',
        title: 'Finalize project proposal',
        description: 'Review and refine the project proposal document.',
        category: 'Done',
        priority: 'medium',
        subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        id: '3fa1a241-2cc3-4e41-be36-7236f6c11866',
        title: 'Attend training workshop',
        description: 'Participate in a professional development workshop.',
        category: 'Done',
        priority: 'low',
        subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
    ],
  },
];

app.post("/login" , (req: Request, res: Response) => {
  const { username, password } = req.body

  const user = users.find((user) => user.username === username && user.password === password);

  if (user) {
    res.send({ success: true, message: 'Logged in successfully!', user: user });
  } else {
    res.status(401).send({ success: false, message: 'Invalid login or password' });
  }
})

app.post("/files", (req: Request, res: Response) => {
  const { userId } = req.body
  const userFiles = files.filter(file => file.ownerId === userId)
  res.json({ userFiles })
})

app.get("/user/:userId", (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = users.find(user => user.id === userId)
  if(user) {
    res.json(user)
  }else {
    res.status(404)
  }
})

app.post("/edit/:kanbanId", (req: Request, res: Response) => {
  const kanbanId = req.params.kanbanId;
  const updatedTask: Task = req.body; 

  const fileToUpdate = files.find((file) => file.id === kanbanId);

  if (!fileToUpdate) {
    return res.status(404).json({ message: "Nie znaleziono pliku o podanym ID kanbanId" });
  }

  const taskToUpdate = fileToUpdate.tasks.find((task) => task.id === updatedTask.id);

  if (!taskToUpdate) {
    return res.status(404).json({ message: "Nie znaleziono zadania o podanym ID" });
  }

  taskToUpdate.title = updatedTask.title;
  taskToUpdate.description = updatedTask.description;
  taskToUpdate.category = updatedTask.category;
  taskToUpdate.priority = updatedTask.priority;
  taskToUpdate.subtasks = updatedTask.subtasks;

  return res.status(200).json({ message: "Zadanie zostało zaktualizowane pomyślnie" });
});

app.get("/", (req: Request, res: Response) => {
  res.send(uuidv4())
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});