import { users, tasks, type User, type InsertUser, type UpdateUser, type Task, type InsertTask, type UpdateTask } from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: UpdateUser): Promise<User | undefined>;
  
  // Task operations
  getTasksByUserId(userId: number): Promise<Task[]>;
  getTask(id: number): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, task: UpdateTask): Promise<Task | undefined>;
  deleteTask(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private tasks: Map<number, Task>;
  private currentUserId: number;
  private currentTaskId: number;

  constructor() {
    this.users = new Map();
    this.tasks = new Map();
    this.currentUserId = 1;
    this.currentTaskId = 1;
    
    // Initialize with a default user and sample tasks
    this.initializeData();
  }

  private initializeData() {
    // Create default user
    const defaultUser: User = {
      id: 1,
      firstName: "Alex",
      lastName: "Johnson",
      email: "alex.johnson@company.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      role: "Product Manager",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
      joinDate: "January 2023"
    };
    this.users.set(1, defaultUser);
    this.currentUserId = 2;

    // Create sample tasks
    const sampleTasks: Task[] = [
      {
        id: 1,
        userId: 1,
        title: "Review project proposal",
        dueDate: "Today",
        priority: "High",
        status: "completed",
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        userId: 1,
        title: "Update user dashboard mockups",
        dueDate: "Tomorrow",
        priority: "Medium",
        status: "pending",
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        userId: 1,
        title: "Team standup meeting",
        dueDate: "Yesterday",
        priority: "Low",
        status: "completed",
        createdAt: new Date().toISOString()
      },
      {
        id: 4,
        userId: 1,
        title: "Prepare quarterly presentation",
        dueDate: "Next week",
        priority: "High",
        status: "pending",
        createdAt: new Date().toISOString()
      },
      {
        id: 5,
        userId: 1,
        title: "Code review for new features",
        dueDate: "Today",
        priority: "Medium",
        status: "completed",
        createdAt: new Date().toISOString()
      },
      {
        id: 6,
        userId: 1,
        title: "Update documentation",
        dueDate: "This week",
        priority: "Low",
        status: "pending",
        createdAt: new Date().toISOString()
      }
    ];

    sampleTasks.forEach(task => {
      this.tasks.set(task.id, task);
    });
    this.currentTaskId = 7;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updateUser: UpdateUser): Promise<User | undefined> {
    const existingUser = this.users.get(id);
    if (!existingUser) return undefined;
    
    const updatedUser: User = { ...existingUser, ...updateUser };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getTasksByUserId(userId: number): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(task => task.userId === userId);
  }

  async getTask(id: number): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = this.currentTaskId++;
    const task: Task = {
      ...insertTask,
      id,
      createdAt: new Date().toISOString()
    };
    this.tasks.set(id, task);
    return task;
  }

  async updateTask(id: number, updateTask: UpdateTask): Promise<Task | undefined> {
    const existingTask = this.tasks.get(id);
    if (!existingTask) return undefined;
    
    const updatedTask: Task = { ...existingTask, ...updateTask };
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  async deleteTask(id: number): Promise<boolean> {
    return this.tasks.delete(id);
  }
}

export const storage = new MemStorage();
