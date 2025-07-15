const maxRowLimit = 100;

export const systemPrompt = `
You are a SQL expert specializing in Microsoft SQL Server. Generate safe, efficient SELECT queries based on natural language questions.

STRICT RULES:
- ONLY generate SELECT queries for safety
- NO INSERT, UPDATE, DELETE, DROP, CREATE, ALTER, or TRUNCATE operations
- Use proper JOIN syntax for related tables
- Include TOP clause to limit results (max ${maxRowLimit} rows)
- Use square brackets for table/column names if needed
- Always validate your SQL syntax
- If you receive an error message, analyze it and fix the SQL query accordingly
- NEVER ask follow-up questions or request additional information from the user
- Complete the task in a single response using available tools

RESPONSE FORMAT:
- Use the tools as needed to complete the task
- Provide a natural language answer based on the query results
- If there are any issues, explain them clearly and provide the best possible answer with available data
- This is a single-turn interaction - no back-and-forth conversation
`;

export const metaData = `
Table description:

1. กำหนดสิทธิ์การใช้งาน
mDropdown
- เก็บ Permission ทั้งหมดของระบบ
tbPMSUser
- เก็บรายละเอียดของ user ที่ใช้งานระบบ PMS (โดยดึงข้อมูลมาจาก Workforce) และเก็บ Permission ของ User แต่ละคน ว่าแต่ละคนใช้สิทธิ์อะไรบ้าง
tbPMSUserHistory
- เก็บ History ของการเปลี่ยนแปลงสิทธิ์ของ User แต่ละคน
tbPMSUserDepAdmin
- เก็บ หน่วยงาน ของ HRBP-Admin หน่วยงาน

2. กำหนดผู้ประเมิน
tbApproverHD
- เก็บการกำหนดผู้ประเมินของแต่ละหน่วยงานของแต่ละปีงบประมาณ (ตาราง Header)
tbApproverHistory
- เก็บ History ของการเปลี่ยนแปลงผู้ประเมิน ผู้อนุมัติ และ admin หน่วยงาน
tbApproverDT
- เก็บการกำหนดผู้ประเมิน ผู้อนุมัติ และ Admin หน่วยงาน ของแต่ละหน่วยงาน (ตาราง Detail)

3. กำหนดรอบการประเมิน
tbPeriod
- เก็บข้อมูลการกำหนดรอบการประเมินประจำปี
tbPeriodHistory
- เก็บ History ของการกำหนดรอบการประเมิน
tbPeriodExtend
- เก็บข้อมูลหน่วยงานที่ของหน่วยงานที่ขอขยายระยะเวลา

4. ตั้งค่าประเภทตัวชี้วัด
tbIndicatorType
- เก็บข้อมูลการกำหนดประเภทตัวชี้วัด
tbIndicatorTypeHistory
- เก็บ History ของการกำหนดประเภทตัวชี้วัด

5. กำหนดน้ำหนักและสัดส่วน
tbIndicatorWeightHd
- เก็บข้อมูลการกำหนดน้ำหนักและสัดส่วน
tbIndicatorWeightHdHistory
- เก็บ History ของการกำหนดน้ำหนักและสัดส่วน
tbIndicatorWeightDt
- เก็บข้อมูลการกำหนดน้ำหนักและสัดส่วน

6. กำหนดตัวชี้วัด
tbIndicatorHd
- เก็บข้อมูลตัวชี้วัด
tbIndicatorHdHistory
- เก็บ History ของการกำหนดข้อมูลตัวชี้วัด
tbIndicatorDt
- เก็บรายละเอียดของตัวชี้วัด

7. กำหนดคะแนนการประเมิน (Rating Scale)
tbRatingScale
- เก็บข้อมูลคะแนนการประเมิน
tbRatingScaleHistory
- เก็บ History ของการกำหนดคะแนนการประเมิน

8. กำหนดช่วงคะแนน (Grading Scale)
tbGradingHd
- เก็บข้อมูลช่วงคะแนนของแต่ละเกรด
tbGradingHdHistory
- เก็บ History ของการกำหนดน้ำหนักและสัดส่วน
tbGradingDt
- เก็บข้อมูลรายละเอียดของช่วงคะแนนของแต่ละเกรด

9. กำหนดจำนวนคนสูงสุดของแต่ละเกณฑ์การประเมิน
tbGradeLimitHd
- เก็บข้อมูลจำนวนคนสูงสุดของแต่ละเกณฑ์การประเมิน
tbGradeLimitHdHistory
- เก็บ History ของการกำหนดจำนวนคนสูงสุดของแต่ละเกณฑ์การประเมิน
tbGradeLimitDt
- เก็บข้อมูลรายละเอียดของช่วงคะแนนของแต่ละเกรด

10. ตั้งค่าการแจ้งเตือน
tbConfigNotification
- เก็บข้อมูลการแจ้งเตือน
tbConfigNotificationHistory
- เก็บ History ของการตั้งค่าการแจ้งเตือน

11. ตรวจสอบรายชื่อผู้ประเมิน
tbEvaluateUserAmount
-เก็บรายชื่อบุคลากรและสถานะการรับการประเมินแต่ละปี (ตาราง Header)
tbEvaluateUserAmountHistory
- เก็บ History ของการตรวจสอบข้อมูลบุลคากรแต่ละปี


12.ตรวจสอบข้อมูลบุคลากร
tbEvaluateUser
- เก็บรายละเอียดของ user ที่เข้าร่วมประเมินแต่ละปี + ผู้ประเมินและผู้อนุมัติ
tbEvaluateUserHistory 
- เก็บ History ของการตรวจสอบข้อมูลบุคลากร

13.ประเมินผล + 14.สร้างแบบประเมิน (สร้างแทน) + 15.อนุมัติแบบประเมิน + 16.ติดตามผลการประเมิน + 20.update ผลงาน + 21.ประเมินผล
tbEvalulateForm
- เก็บรายละเอียดของแบบประเมินพร้อมกับสถานะ
tbEvalulateFormKPIandCom
- เก็บรายละเอียดของตัวชี้วัดและผลการประเมินในแต่ละหัวข้อ
tbEvalulateFormLearning
- เก็บรายละเอียดของตัวชี้วัดแท็บ Learning (แท็บแผนการฝึกอบรมและพัฒนา)
`;
