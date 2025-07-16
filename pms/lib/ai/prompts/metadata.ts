export const METADATA_SCHEMA = `
Table description:

tbPMSUser
- เก็บรายละเอียดของ user ที่ใช้งานระบบ PMS (โดยดึงข้อมูลมาจาก Workforce) และเก็บ Permission ของ User แต่ละคน ว่าแต่ละคนใช้สิทธิ์อะไรบ้าง

## กำหนดรอบการประเมิน
tbPeriod
- เก็บข้อมูลการกำหนดรอบการประเมินประจำปี
tbPeriodHistory
- เก็บ History ของการกำหนดรอบการประเมิน
tbPeriodExtend
- เก็บข้อมูลหน่วยงานที่ของหน่วยงานที่ขอขยายระยะเวลา

## ตั้งค่าประเภทตัวชี้วัด
tbIndicatorType
- เก็บข้อมูลการกำหนดประเภทตัวชี้วัด
tbIndicatorTypeHistory
- เก็บ History ของการกำหนดประเภทตัวชี้วัด

## กำหนดน้ำหนักและสัดส่วน
tbIndicatorWeightHd
- เก็บข้อมูลการกำหนดน้ำหนักและสัดส่วน
tbIndicatorWeightHdHistory
- เก็บ History ของการกำหนดน้ำหนักและสัดส่วน
tbIndicatorWeightDt
- เก็บข้อมูลการกำหนดน้ำหนักและสัดส่วน

## กำหนดตัวชี้วัด
tbIndicatorHd
- เก็บข้อมูลตัวชี้วัด
tbIndicatorHdHistory
- เก็บ History ของการกำหนดข้อมูลตัวชี้วัด
tbIndicatorDt
- เก็บรายละเอียดของตัวชี้วัด

## กำหนดคะแนนการประเมิน (Rating Scale)
tbRatingScale
- เก็บข้อมูลคะแนนการประเมิน
tbRatingScaleHistory
- เก็บ History ของการกำหนดคะแนนการประเมิน

##กำหนดช่วงคะแนน (Grading Scale)
tbGradingHd
- เก็บข้อมูลช่วงคะแนนของแต่ละเกรด
tbGradingHdHistory
- เก็บ History ของการกำหนดน้ำหนักและสัดส่วน
tbGradingDt
- เก็บข้อมูลรายละเอียดของช่วงคะแนนของแต่ละเกรด

## กำหนดจำนวนคนสูงสุดของแต่ละเกณฑ์การประเมิน
tbGradeLimitHd
- เก็บข้อมูลจำนวนคนสูงสุดของแต่ละเกณฑ์การประเมิน
tbGradeLimitHdHistory
- เก็บ History ของการกำหนดจำนวนคนสูงสุดของแต่ละเกณฑ์การประเมิน
tbGradeLimitDt
- เก็บข้อมูลรายละเอียดของช่วงคะแนนของแต่ละเกรด


## ตรวจสอบรายชื่อผู้ประเมิน
tbEvaluateUserAmount
-เก็บรายชื่อบุคลากรและสถานะการรับการประเมินแต่ละปี (ตาราง Header)
tbEvaluateUserAmountHistory
- เก็บ History ของการตรวจสอบข้อมูลบุลคากรแต่ละปี


## ตรวจสอบข้อมูลบุคลากร
tbEvaluateUser
- เก็บรายละเอียดของ user ที่เข้าร่วมประเมินแต่ละปี + ผู้ประเมินและผู้อนุมัติ
tbEvaluateUserHistory 
- เก็บ History ของการตรวจสอบข้อมูลบุคลากร

## ประเมินผล + สร้างแบบประเมิน (สร้างแทน) + อนุมัติแบบประเมิน + ติดตามผลการประเมิน + update ผลงาน + ประเมินผล
tbEvalulateForm
- เก็บรายละเอียดของแบบประเมินพร้อมกับสถานะ
tbEvalulateFormKPIandCom
- เก็บรายละเอียดของตัวชี้วัดและผลการประเมินในแต่ละหัวข้อ
tbEvalulateFormLearning
- เก็บรายละเอียดของตัวชี้วัดแท็บ Learning (แท็บแผนการฝึกอบรมและพัฒนา)
`;