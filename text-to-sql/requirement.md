```
flowchart LR
    A["📝 User Input<br/>Natural language question"] --> B["🔍 Schema Analysis<br/>Identify required tables"]
    
    B --> C["📊 Fetch Schema<br/>Get relevant schema"]
    
    C --> D["🤖 Generate SQL<br/>Create SQL query"]
    
    D --> E["✅ Validate Query<br/>Check syntax"]
    
    E -->|Valid| F["⚡ Execute SQL<br/>Run query"]
    E -->|Invalid| G["🔧 Fix Query<br/>Correct query"]
    
    G --> D
    
    F --> H["📋 Format Results<br/>Format data"]
    
    H --> I["📊 Return Data<br/>Send results"]
```

ช่วยสร้าง code ที่ทำงานตาม flow นี้โดยสำหรับเอาไว้ใช้กับงาน workshop จะเอาไปใช้สำหรับสอน

### condition เพิ่มเติม
- DB เป็น SQL Server
- อยากได้แบบเป็นไฟล์ที่สุดท้ายแค่รันเช่น text-to-sql-xxx.ts แล้วดูผลลัพธ์ที่ terminal เลยอาจจะมีการดู log ออกมาเพื่อดู state และผลลัพธ์ที่ได้
- ต้องการให้มีเฉพาะการ query เท่านั้น ไม่ให้เกิดการ create update delete อะไรใดๆ

### Prompt and Schema Strategy & Optimization
- ควรมีการโยน Schema ให้อย่างชัดเจนว่ามีข้อมูลอะไรบ้าง เช่นจากการดึง schema จาก db 
- มันจะต้องมีข้อมูลต่างๆครบ เช่น name, type, Relationship
- มึการเพิ่ม metadata ได้ เช่น Business Context Integration ยกตัวอย่างเช่น 
```
Business Rules:
- Product categories: 'Electronics', 'Clothing', 'Books', 'Home'
- Order statuses: 'pending', 'processing', 'completed', 'cancelled'
- Only completed orders count for sales reporting
- Customer emails must be unique
- Prices include tax
``` 
- Including Sample Rows 


### stack ที่อยากได้เบื้องต้น
- bun
- typescript
- ai sdk (vercel)

### เพิ่มเติม
- ใช้ openai llm โมเดล gpt-4o-mini แต่ให้มีการทำใส่แบบแก้ base_url ได้เพราะอาจจะใช้ llm openai ที่มาจาก url ของ openai เอง
- เพิ่มเติมว่าต่อไปอาจจะมีการเพิ่มให้รันแบบหลายๆเคส
- และอาจจะมีการทำแบบเขียนแบบใช้ tool ก็คือ sql agent ไม่ใช่แบบ workflow แต่ว่ายังไม่ต้องทำตอนนี้