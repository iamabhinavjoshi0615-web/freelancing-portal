import fs from "fs";
import path from "path";
import {
  DEFAULT_TOPICS,
  DEFAULT_SERVICES,
  DEFAULT_PRICING_TIERS,
  DEFAULT_CMS_SETTINGS,
  DEFAULT_PROJECTS,
  Topic,
  Service,
  PriceTier,
  Project
} from "./content";

// Base database file path (stored in project root for easy access)
const DB_FILE_PATH = path.resolve(process.cwd(), "db.json");

export interface Order {
  id: string; // Razorpay Order ID or Mock ID
  amount: number; // In Rupees (e.g. 99 or 249)
  currency: string;
  status: "created" | "paid" | "failed";
  receipt: string;
  email: string;
  phone: string;
  name: string;
  topicId: string; // Specific topic ID or "bundle"
  purchaseType?: "single" | "bundle";
  whatsappOptIn?: boolean;
  createdAt: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  verifiedAt?: string;
}

export interface Unlock {
  email: string;
  topicId: string;
  unlockedAt: string;
  orderId: string;
  whatsappOptIn?: boolean;
}

export interface QuizResponse {
  id: string;
  sessionId: string;
  businessType: string;
  hasWebsite: string;
  goal: string;
  budget: string;
  timeline: string;
  estimatedMin: number;
  estimatedMax: number;
  createdAt: string;
  email?: string;
  phone?: string;
  estimateData?: any;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string; // Stored securely in our local JSON db
  createdAt: string;
}

export interface DbSchema {
  orders: Order[];
  unlocks: Unlock[];
  topics: Topic[];
  services: Service[];
  pricingTiers: PriceTier[];
  cmsSettings: typeof DEFAULT_CMS_SETTINGS;
  projects: Project[];
  users: User[];
  quizResponses: QuizResponse[];
  newsletterSubscribers?: NewsletterSubscriber[];
}

// Function to read and initialize the database
export function getDb(): DbSchema {
  try {
    if (!fs.existsSync(DB_FILE_PATH)) {
      // Seed default database structure
      const initialDb: DbSchema = {
        orders: [],
        unlocks: [],
        topics: DEFAULT_TOPICS,
        services: DEFAULT_SERVICES,
        pricingTiers: DEFAULT_PRICING_TIERS,
        cmsSettings: DEFAULT_CMS_SETTINGS,
        projects: DEFAULT_PROJECTS,
        users: [],
        quizResponses: [],
        newsletterSubscribers: [],
      };
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(initialDb, null, 2), "utf8");
      return initialDb;
    }

    const fileContent = fs.readFileSync(DB_FILE_PATH, "utf8");
    const parsed = JSON.parse(fileContent) as DbSchema;
    
    // Auto-migrate if projects is missing in existing db.json
    let migrated = false;
    if (!parsed.projects) {
      parsed.projects = DEFAULT_PROJECTS;
      migrated = true;
    }
    
    // Auto-migrate if users is missing in existing db.json
    if (!parsed.users) {
      parsed.users = [];
      migrated = true;
    }

    // Auto-migrate if quizResponses is missing in existing db.json
    if (!parsed.quizResponses) {
      parsed.quizResponses = [];
      migrated = true;
    }

    // Auto-migrate if newsletterSubscribers is missing in existing db.json
    if (!parsed.newsletterSubscribers) {
      parsed.newsletterSubscribers = [];
      migrated = true;
    }

    if (migrated) {
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(parsed, null, 2), "utf8");
    }
    
    return parsed;
  } catch (error) {
    console.error("Error reading JSON database:", error);
    // Return fallback state if JSON parsing fails to avoid app crashes
    return {
      orders: [],
      unlocks: [],
      topics: DEFAULT_TOPICS,
      services: DEFAULT_SERVICES,
      pricingTiers: DEFAULT_PRICING_TIERS,
      cmsSettings: DEFAULT_CMS_SETTINGS,
      projects: DEFAULT_PROJECTS,
      users: [],
      quizResponses: [],
    };
  }
}

// Function to save the database state
export function saveDb(db: DbSchema): void {
  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(db, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing JSON database:", error);
  }
}

// API helper operations
export function getOrders(): Order[] {
  return getDb().orders;
}

export function createOrder(order: Order): void {
  const db = getDb();
  db.orders.push(order);
  saveDb(db);
}

export function updateOrder(orderId: string, updates: Partial<Order>): void {
  const db = getDb();
  db.orders = db.orders.map((o) => (o.id === orderId ? { ...o, ...updates } : o));
  saveDb(db);
}

export function getUnlocks(): Unlock[] {
  return getDb().unlocks;
}

export function addUnlock(unlock: Unlock): void {
  const db = getDb();
  // Avoid duplicate unlocks
  const exists = db.unlocks.some(
    (u) => u.email.toLowerCase() === unlock.email.toLowerCase() && u.topicId === unlock.topicId
  );
  if (!exists) {
    db.unlocks.push(unlock);
    saveDb(db);
  }
}

export function checkUnlock(email: string, topicId: string): boolean {
  const db = getDb();
  const lowerEmail = email.toLowerCase().trim();
  return db.unlocks.some(
    (u) => u.email.toLowerCase().trim() === lowerEmail && (u.topicId === topicId || u.topicId === "bundle")
  );
}

export function getTopics(): Topic[] {
  return getDb().topics;
}

export function updateTopic(topicId: string, updatedTopic: Partial<Topic>): void {
  const db = getDb();
  db.topics = db.topics.map((t) => (t.id === topicId ? { ...t, ...updatedTopic } as Topic : t));
  saveDb(db);
}

export function getServices(): Service[] {
  return getDb().services;
}

export function updateServices(services: Service[]): void {
  const db = getDb();
  db.services = services;
  saveDb(db);
}

export function getPricingTiers(): PriceTier[] {
  return getDb().pricingTiers;
}

export function updatePricingTiers(tiers: PriceTier[]): void {
  const db = getDb();
  db.pricingTiers = tiers;
  saveDb(db);
}

export function getCmsSettings(): typeof DEFAULT_CMS_SETTINGS {
  return getDb().cmsSettings;
}

export function updateCmsSettings(settings: Partial<typeof DEFAULT_CMS_SETTINGS>): void {
  const db = getDb();
  db.cmsSettings = { ...db.cmsSettings, ...settings };
  saveDb(db);
}

export function getProjects(): Project[] {
  return getDb().projects;
}

export function updateProjects(projects: Project[]): void {
  const db = getDb();
  db.projects = projects;
  saveDb(db);
}

export function getUsers(): User[] {
  return getDb().users;
}

export function createUser(user: User): void {
  const db = getDb();
  db.users.push(user);
  saveDb(db);
}

export function getUserByEmail(email: string): User | undefined {
  return getDb().users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function createQuizResponse(response: QuizResponse): void {
  const db = getDb();
  if (!db.quizResponses) db.quizResponses = [];
  db.quizResponses.push(response);
  saveDb(db);
}

export function getQuizResponses(): QuizResponse[] {
  const db = getDb();
  return db.quizResponses || [];
}

export function getQuizResponseBySession(sessionId: string): QuizResponse | undefined {
  const responses = getQuizResponses();
  return responses.find((r) => r.sessionId === sessionId);
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

export function addNewsletterSubscriber(email: string): NewsletterSubscriber {
  const db = getDb();
  if (!db.newsletterSubscribers) {
    db.newsletterSubscribers = [];
  }
  const existing = db.newsletterSubscribers.find(
    (s: NewsletterSubscriber) => s.email.toLowerCase() === email.toLowerCase()
  );
  if (existing) return existing;

  const subscriber: NewsletterSubscriber = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    email,
    subscribedAt: new Date().toISOString(),
  };
  db.newsletterSubscribers.push(subscriber);
  saveDb(db);
  return subscriber;
}

export function getNewsletterSubscribers(): NewsletterSubscriber[] {
  const db = getDb();
  return db.newsletterSubscribers || [];
}



