export const databaseSchemas = `"TABLE_SCHEMA","TABLE_NAME","COLUMN_NAME","DATA_TYPE","CHARACTER_MAXIMUM_LENGTH","IS_NULLABLE"
dbo,authData,id,int,,NO
dbo,authData,createdAt,datetime,,NO
dbo,authData,createdByName,varchar,500,YES
dbo,authData,createdBy,varchar,50,YES
dbo,authData,updatedAt,datetime,,NO
dbo,authData,updatedBy,varchar,50,YES
dbo,authData,updatedByName,varchar,500,YES
dbo,authData,isDeleted,bit,,NO
dbo,authData,token,varchar,4000,YES
dbo,authData,otp,varchar,10,YES
dbo,authData,email,varchar,255,YES
dbo,authData,refreshToken,varchar,4000,YES
dbo,emailConfig,id,int,,NO
dbo,emailConfig,emailTo,varchar,255,YES
dbo,emailConfig,emailToName,varchar,1000,YES
dbo,emailConfig,emailCc,varchar,255,YES
dbo,emailConfig,emailCcName,varchar,1000,YES
dbo,emailConfig,emailType,varchar,50,YES
dbo,emailConfig,subject,varchar,255,YES
dbo,emailConfig,isActive,bit,,NO
dbo,emailConfig,isDeleted,bit,,NO
dbo,mDropdown,id,int,,NO
dbo,mDropdown,createdAt,datetime,,NO
dbo,mDropdown,createdByName,varchar,500,YES
dbo,mDropdown,createdBy,varchar,50,YES
dbo,mDropdown,updatedAt,datetime,,NO
dbo,mDropdown,updatedBy,varchar,50,YES
dbo,mDropdown,updatedByName,varchar,500,YES
dbo,mDropdown,isDeleted,bit,,NO
dbo,mDropdown,dropdownType,varchar,255,NO
dbo,mDropdown,dropdownCode,varchar,50,NO
dbo,mDropdown,dropdownNameTh,varchar,255,NO
dbo,mDropdown,dropdownNameEn,varchar,255,YES
dbo,mDropdown,sort,int,,NO
dbo,mDropdown,orgId,varchar,36,YES
dbo,pmsAttachFile,id,int,,NO
dbo,pmsAttachFile,createdAt,datetime,,NO
dbo,pmsAttachFile,createdByName,varchar,500,YES
dbo,pmsAttachFile,createdBy,varchar,50,YES
dbo,pmsAttachFile,updatedAt,datetime,,NO
dbo,pmsAttachFile,updatedBy,varchar,50,YES
dbo,pmsAttachFile,updatedByName,varchar,500,YES
dbo,pmsAttachFile,isDeleted,bit,,NO
dbo,pmsAttachFile,relatedTable,varchar,50,NO
dbo,pmsAttachFile,appProfileRelatedId,int,,YES
dbo,pmsAttachFile,proLicenseRelatedId,int,,YES
dbo,pmsAttachFile,sort,int,,NO
dbo,pmsAttachFile,sortFile,varchar,50,YES
dbo,pmsAttachFile,fileName,varchar,500,YES
dbo,pmsAttachFile,documentType,varchar,100,YES
dbo,pmsAttachFile,fileType,varchar,500,YES
dbo,pmsAttachFile,filePath,varchar,1000,YES
dbo,pmsAttachFile,fileSize,varchar,100,YES
dbo,pmsAttachFile,description,varchar,500,YES
dbo,tbApproverDT,id,int,,NO
dbo,tbApproverDT,approverHDId,int,,NO
dbo,tbApproverDT,wfOrgUnitId,varchar,36,NO
dbo,tbApproverDT,orgUnitCode,varchar,50,NO
dbo,tbApproverDT,orgUnitName,varchar,1000,NO
dbo,tbApproverDT,orgUnitTypeId,varchar,36,NO
dbo,tbApproverDT,orgUnitTypeCode,varchar,36,NO
dbo,tbApproverDT,orgUnitTypeName,varchar,100,YES
dbo,tbApproverDT,parentOrgUnitId,varchar,36,NO
dbo,tbApproverDT,buId,varchar,36,YES
dbo,tbApproverDT,buCode,varchar,50,YES
dbo,tbApproverDT,buName,varchar,1000,YES
dbo,tbApproverDT,isSetSeparate,bit,,NO
dbo,tbApproverDT,evaluatorId,int,,NO
dbo,tbApproverDT,evaluatorEmpId,varchar,36,NO
dbo,tbApproverDT,evaluatorCode,varchar,1000,NO
dbo,tbApproverDT,evaluatorTitle,varchar,100,NO
dbo,tbApproverDT,evaluatorFirstName,varchar,1000,NO
dbo,tbApproverDT,evaluatorMiddleName,varchar,1000,YES
dbo,tbApproverDT,evaluatorLastName,varchar,1000,YES
dbo,tbApproverDT,evaluatorEmail,varchar,255,YES
dbo,tbApproverDT,approverId,int,,NO
dbo,tbApproverDT,approverEmpId,varchar,36,NO
dbo,tbApproverDT,approverCode,varchar,1000,NO
dbo,tbApproverDT,approverTitle,varchar,100,NO
dbo,tbApproverDT,approverFirstName,varchar,1000,NO
dbo,tbApproverDT,approverMiddleName,varchar,1000,YES
dbo,tbApproverDT,approverLastName,varchar,1000,YES
dbo,tbApproverDT,approverEmail,varchar,255,YES
dbo,tbApproverDT,admin1Id,int,,NO
dbo,tbApproverDT,admin1EmpId,varchar,36,NO
dbo,tbApproverDT,admin1Code,varchar,1000,NO
dbo,tbApproverDT,admin1Title,varchar,100,NO
dbo,tbApproverDT,admin1FirstName,varchar,1000,NO
dbo,tbApproverDT,admin1MiddleName,varchar,1000,YES
dbo,tbApproverDT,admin1LastName,varchar,1000,YES
dbo,tbApproverDT,admin1Email,varchar,255,YES
dbo,tbApproverDT,admin2Id,int,,NO
dbo,tbApproverDT,admin2EmpId,varchar,36,NO
dbo,tbApproverDT,admin2Code,varchar,1000,NO
dbo,tbApproverDT,admin2Title,varchar,100,NO
dbo,tbApproverDT,admin2FirstName,varchar,1000,NO
dbo,tbApproverDT,admin2MiddleName,varchar,1000,YES
dbo,tbApproverDT,admin2LastName,varchar,1000,YES
dbo,tbApproverDT,admin2Email,varchar,255,YES
dbo,tbApproverDT,admin3Id,int,,NO
dbo,tbApproverDT,admin3EmpId,varchar,36,NO
dbo,tbApproverDT,admin3Code,varchar,1000,NO
dbo,tbApproverDT,admin3Title,varchar,100,NO
dbo,tbApproverDT,admin3FirstName,varchar,1000,NO
dbo,tbApproverDT,admin3MiddleName,varchar,1000,YES
dbo,tbApproverDT,admin3LastName,varchar,1000,YES
dbo,tbApproverDT,admin3Email,varchar,255,YES
dbo,tbApproverDT,admin4Id,int,,NO
dbo,tbApproverDT,admin4EmpId,varchar,36,NO
dbo,tbApproverDT,admin4Code,varchar,1000,NO
dbo,tbApproverDT,admin4Title,varchar,100,NO
dbo,tbApproverDT,admin4FirstName,varchar,1000,NO
dbo,tbApproverDT,admin4MiddleName,varchar,1000,YES
dbo,tbApproverDT,admin4LastName,varchar,1000,YES
dbo,tbApproverDT,admin4Email,varchar,255,YES
dbo,tbApproverDT,admin5Id,int,,NO
dbo,tbApproverDT,admin5EmpId,varchar,36,NO
dbo,tbApproverDT,admin5Code,varchar,1000,NO
dbo,tbApproverDT,admin5Title,varchar,100,NO
dbo,tbApproverDT,admin5FirstName,varchar,1000,NO
dbo,tbApproverDT,admin5MiddleName,varchar,1000,YES
dbo,tbApproverDT,admin5LastName,varchar,1000,YES
dbo,tbApproverDT,admin5Email,varchar,255,YES
dbo,tbApproverDT,isDeleted,bit,,NO
dbo,tbApproverDT,createdAt,datetime2,,NO
dbo,tbApproverDT,createdBy,varchar,36,NO
dbo,tbApproverDT,createdByName,varchar,255,YES
dbo,tbApproverDT,updatedAt,datetime2,,YES
dbo,tbApproverDT,updatedBy,varchar,36,YES
dbo,tbApproverDT,updatedByName,varchar,255,YES
dbo,tbApproverHD,id,int,,NO
dbo,tbApproverHD,fiscalYear,varchar,10,NO
dbo,tbApproverHD,status,varchar,50,NO
dbo,tbApproverHD,isInactive,bit,,NO
dbo,tbApproverHD,isDeleted,bit,,NO
dbo,tbApproverHD,createdAt,datetime2,,NO
dbo,tbApproverHD,createdBy,varchar,36,NO
dbo,tbApproverHD,createdByName,varchar,255,YES
dbo,tbApproverHD,updatedAt,datetime2,,YES
dbo,tbApproverHD,updatedBy,varchar,36,YES
dbo,tbApproverHD,updatedByName,varchar,255,YES
dbo,tbApproverHistory,id,int,,NO
dbo,tbApproverHistory,approverHDId,int,,NO
dbo,tbApproverHistory,historyType,varchar,50,NO
dbo,tbApproverHistory,orgUnitId,varchar,36,NO
dbo,tbApproverHistory,orgUnitCode,varchar,50,NO
dbo,tbApproverHistory,orgUnitName,varchar,1000,NO
dbo,tbApproverHistory,remark,varchar,1000,NO
dbo,tbApproverHistory,isDeleted,bit,,NO
dbo,tbApproverHistory,createdAt,datetime2,,NO
dbo,tbApproverHistory,createdBy,varchar,36,NO
dbo,tbApproverHistory,createdByName,varchar,255,YES
dbo,tbApproverHistory,updatedAt,datetime2,,YES
dbo,tbApproverHistory,updatedBy,varchar,36,YES
dbo,tbApproverHistory,updatedByName,varchar,255,YES
dbo,tbConfigNotification,id,int,,NO
dbo,tbConfigNotification,notiTypeName,varchar,50,NO
dbo,tbConfigNotification,notiTypeNameEng,varchar,50,NO
dbo,tbConfigNotification,isEmail,bit,,NO
dbo,tbConfigNotification,isVTRC,bit,,NO
dbo,tbConfigNotification,isLine,bit,,NO
dbo,tbConfigNotification,isEvaluatee,bit,,NO
dbo,tbConfigNotification,isEvaluator,bit,,NO
dbo,tbConfigNotification,isApprover,bit,,NO
dbo,tbConfigNotification,isOrgUnitAdmin,bit,,NO
dbo,tbConfigNotification,isAdvanceNoti,bit,,NO
dbo,tbConfigNotification,advanceNotiDay,int,,NO
dbo,tbConfigNotification,isDeleted,bit,,NO
dbo,tbConfigNotification,createdAt,datetime2,,NO
dbo,tbConfigNotification,createdBy,varchar,36,NO
dbo,tbConfigNotification,createdByName,varchar,255,YES
dbo,tbConfigNotification,updatedAt,datetime2,,YES
dbo,tbConfigNotification,updatedBy,varchar,36,YES
dbo,tbConfigNotification,updatedByName,varchar,255,YES
dbo,tbConfigNotification,status,varchar,50,NO
dbo,tbConfigNotification,notiTypeCode,varchar,50,NO
dbo,tbConfigNotificationHistory,id,int,,NO
dbo,tbConfigNotificationHistory,configNotificationId,int,,YES
dbo,tbConfigNotificationHistory,historyType,varchar,50,NO
dbo,tbConfigNotificationHistory,remark,varchar,255,YES
dbo,tbConfigNotificationHistory,createdAt,datetime2,,NO
dbo,tbConfigNotificationHistory,createdBy,varchar,36,NO
dbo,tbConfigNotificationHistory,createdByName,varchar,255,NO
dbo,tbConfigNotificationHistory,updatedAt,datetime2,,NO
dbo,tbConfigNotificationHistory,updatedBy,varchar,36,NO
dbo,tbConfigNotificationHistory,updatedByName,varchar,255,NO
dbo,tbConfigNotificationHistory,isDeleted,bit,,YES
dbo,tbEvaluateUser,id,int,,NO
dbo,tbEvaluateUser,pmsUserId,int,,NO
dbo,tbEvaluateUser,wfEmpId,varchar,36,YES
dbo,tbEvaluateUser,refEmpId,varchar,36,NO
dbo,tbEvaluateUser,empCode,varchar,50,NO
dbo,tbEvaluateUser,manpowerNo,varchar,50,NO
dbo,tbEvaluateUser,title,varchar,100,NO
dbo,tbEvaluateUser,firstName,varchar,1000,NO
dbo,tbEvaluateUser,middleName,varchar,1000,YES
dbo,tbEvaluateUser,lastName,varchar,1000,YES
dbo,tbEvaluateUser,identityCard,varchar,17,NO
dbo,tbEvaluateUser,gender,varchar,50,NO
dbo,tbEvaluateUser,email,varchar,255,NO
dbo,tbEvaluateUser,employmentTypeCode,varchar,50,NO
dbo,tbEvaluateUser,employmentTypeName,varchar,1000,NO
dbo,tbEvaluateUser,workingStatus,varchar,255,NO
dbo,tbEvaluateUser,reportToId,varchar,36,NO
dbo,tbEvaluateUser,reportToCode,varchar,36,NO
dbo,tbEvaluateUser,reportTotitle,varchar,100,NO
dbo,tbEvaluateUser,reportTofirstName,varchar,1000,NO
dbo,tbEvaluateUser,reportTomiddleName,varchar,1000,NO
dbo,tbEvaluateUser,reportTolastName,varchar,1000,NO
dbo,tbEvaluateUser,buCode,varchar,50,NO
dbo,tbEvaluateUser,buName,varchar,1000,NO
dbo,tbEvaluateUser,divisionCode,varchar,50,NO
dbo,tbEvaluateUser,divisionName,varchar,1000,NO
dbo,tbEvaluateUser,otherCode,varchar,50,NO
dbo,tbEvaluateUser,otherName,varchar,1000,NO
dbo,tbEvaluateUser,orgUnitId,varchar,36,NO
dbo,tbEvaluateUser,orgUnitCode,varchar,50,NO
dbo,tbEvaluateUser,orgUnitName,varchar,1000,NO
dbo,tbEvaluateUser,posCareerCode,varchar,50,NO
dbo,tbEvaluateUser,posCareerName,varchar,1000,NO
dbo,tbEvaluateUser,posManageCode,varchar,50,NO
dbo,tbEvaluateUser,posManageName,varchar,1000,NO
dbo,tbEvaluateUser,posTechnicalCode,varchar,50,NO
dbo,tbEvaluateUser,posTechnicalName,varchar,1000,NO
dbo,tbEvaluateUser,departmentCode,varchar,50,NO
dbo,tbEvaluateUser,departmentName,varchar,1000,NO
dbo,tbEvaluateUser,employeeLevelCode,varchar,50,NO
dbo,tbEvaluateUser,employeeLevelName,varchar,1000,NO
dbo,tbEvaluateUser,startDate,datetime2,,NO
dbo,tbEvaluateUser,workingDate,datetime2,,NO
dbo,tbEvaluateUser,birthdate,datetime2,,NO
dbo,tbEvaluateUser,employDate,datetime2,,NO
dbo,tbEvaluateUser,isResign,bit,,NO
dbo,tbEvaluateUser,isRetire,bit,,NO
dbo,tbEvaluateUser,pmsPermission,varchar,1000,NO
dbo,tbEvaluateUser,evaluatorId,int,,NO
dbo,tbEvaluateUser,evaluatorEmpId,varchar,36,NO
dbo,tbEvaluateUser,evaluatorCode,varchar,1000,NO
dbo,tbEvaluateUser,evaluatorTitle,varchar,100,NO
dbo,tbEvaluateUser,evaluatorFirstName,varchar,1000,NO
dbo,tbEvaluateUser,evaluatorMiddleName,varchar,1000,YES
dbo,tbEvaluateUser,evaluatorLastName,varchar,1000,YES
dbo,tbEvaluateUser,evaluatorEmail,varchar,255,YES
dbo,tbEvaluateUser,approverId,int,,NO
dbo,tbEvaluateUser,approverEmpId,varchar,36,NO
dbo,tbEvaluateUser,approverCode,varchar,1000,NO
dbo,tbEvaluateUser,approverTitle,varchar,100,NO
dbo,tbEvaluateUser,approverFirstName,varchar,1000,NO
dbo,tbEvaluateUser,approverMiddleName,varchar,1000,YES
dbo,tbEvaluateUser,approverLastName,varchar,1000,YES
dbo,tbEvaluateUser,approverEmail,varchar,255,YES
dbo,tbEvaluateUser,isCorrectData,bit,,YES
dbo,tbEvaluateUser,correctDate,datetime2,,YES
dbo,tbEvaluateUser,notCorrectDataReason,varchar,1000,YES
dbo,tbEvaluateUser,isEvaluate,bit,,YES
dbo,tbEvaluateUser,notEvaluateReason,varchar,1000,YES
dbo,tbEvaluateUser,evaluateDate,datetime2,,YES
dbo,tbEvaluateUser,isAutoCreate,bit,,YES
dbo,tbEvaluateUser,evaluateUserAmountId,int,,YES
dbo,tbEvaluateUser,createdAt,datetime2,,NO
dbo,tbEvaluateUser,createdByName,varchar,500,YES
dbo,tbEvaluateUser,createdBy,varchar,50,YES
dbo,tbEvaluateUser,updatedAt,datetime2,,NO
dbo,tbEvaluateUser,updatedBy,varchar,50,YES
dbo,tbEvaluateUser,updatedByName,varchar,500,YES
dbo,tbEvaluateUser,isDeleted,bit,,NO
dbo,tbEvaluateUser,evaluateByApp,varchar,20,YES
dbo,tbEvaluateUser,correctByApp,varchar,20,YES
dbo,tbEvaluateUserAmount,id,int,,NO
dbo,tbEvaluateUserAmount,fiscalYear,varchar,10,NO
dbo,tbEvaluateUserAmount,orgUnitId,varchar,36,NO
dbo,tbEvaluateUserAmount,orgUnitCode,varchar,50,NO
dbo,tbEvaluateUserAmount,orgUnitName,varchar,1000,NO
dbo,tbEvaluateUserAmount,buId,varchar,36,NO
dbo,tbEvaluateUserAmount,buCode,varchar,50,NO
dbo,tbEvaluateUserAmount,buName,varchar,1000,NO
dbo,tbEvaluateUserAmount,amount,int,,YES
dbo,tbEvaluateUserAmount,exceptAmount,int,,YES
dbo,tbEvaluateUserAmount,total,int,,YES
dbo,tbEvaluateUserAmount,autoAddAmount,int,,YES
dbo,tbEvaluateUserAmount,autoExceptAmount,int,,YES
dbo,tbEvaluateUserAmount,status,varchar,50,NO
dbo,tbEvaluateUserAmount,isInactive,bit,,NO
dbo,tbEvaluateUserAmount,periodId,int,,YES
dbo,tbEvaluateUserAmount,createdAt,datetime2,,NO
dbo,tbEvaluateUserAmount,createdByName,varchar,500,YES
dbo,tbEvaluateUserAmount,createdBy,varchar,50,YES
dbo,tbEvaluateUserAmount,updatedAt,datetime2,,NO
dbo,tbEvaluateUserAmount,updatedBy,varchar,50,YES
dbo,tbEvaluateUserAmount,updatedByName,varchar,500,YES
dbo,tbEvaluateUserAmount,isDeleted,bit,,NO
dbo,tbEvaluateUserAmountHistory,id,int,,NO
dbo,tbEvaluateUserAmountHistory,evaluateUserAmountId,int,,NO
dbo,tbEvaluateUserAmountHistory,historyType,varchar,50,NO
dbo,tbEvaluateUserAmountHistory,status,varchar,50,NO
dbo,tbEvaluateUserAmountHistory,remark,nvarchar,-1,YES
dbo,tbEvaluateUserAmountHistory,createdAt,datetime2,,NO
dbo,tbEvaluateUserAmountHistory,createdByName,varchar,500,YES
dbo,tbEvaluateUserAmountHistory,createdBy,varchar,50,YES
dbo,tbEvaluateUserAmountHistory,updatedAt,datetime2,,NO
dbo,tbEvaluateUserAmountHistory,updatedBy,varchar,50,YES
dbo,tbEvaluateUserAmountHistory,updatedByName,varchar,500,YES
dbo,tbEvaluateUserAmountHistory,isDeleted,bit,,NO
dbo,tbEvaluateUserAmountHistory,orgUnitId,varchar,36,YES
dbo,tbEvaluateUserAmountHistory,orgUnitCode,varchar,50,YES
dbo,tbEvaluateUserAmountHistory,orgUnitName,varchar,255,YES
dbo,tbGradeLimitDt,id,int,,NO
dbo,tbGradeLimitDt,gradeLimitHdId,int,,NO
dbo,tbGradeLimitDt,gradingDtId,int,,NO
dbo,tbGradeLimitDt,condition,varchar,30,YES
dbo,tbGradeLimitDt,percentage,decimal,,YES
dbo,tbGradeLimitDt,isCalWithOtherGrade,bit,,NO
dbo,tbGradeLimitDt,calWithGradingDtId,int,,YES
dbo,tbGradeLimitDt,sort,int,,NO
dbo,tbGradeLimitDt,gradeLimitRemark,varchar,1000,YES
dbo,tbGradeLimitDt,createdAt,datetime2,,NO
dbo,tbGradeLimitDt,createdByName,varchar,500,YES
dbo,tbGradeLimitDt,createdBy,varchar,50,YES
dbo,tbGradeLimitDt,updatedAt,datetime2,,NO
dbo,tbGradeLimitDt,updatedBy,varchar,50,YES
dbo,tbGradeLimitDt,updatedByName,varchar,500,YES
dbo,tbGradeLimitDt,isDeleted,bit,,NO
dbo,tbGradeLimitHd,id,int,,NO
dbo,tbGradeLimitHd,totalPercent,decimal,,YES
dbo,tbGradeLimitHd,yearStart,varchar,10,NO
dbo,tbGradeLimitHd,yearEnd,varchar,10,YES
dbo,tbGradeLimitHd,status,varchar,50,NO
dbo,tbGradeLimitHd,usageStatus,varchar,50,NO
dbo,tbGradeLimitHd,refReviseId,int,,YES
dbo,tbGradeLimitHd,gradingHdId,int,,YES
dbo,tbGradeLimitHd,createdAt,datetime2,,NO
dbo,tbGradeLimitHd,createdByName,varchar,500,YES
dbo,tbGradeLimitHd,createdBy,varchar,50,YES
dbo,tbGradeLimitHd,updatedAt,datetime2,,NO
dbo,tbGradeLimitHd,updatedBy,varchar,50,YES
dbo,tbGradeLimitHd,updatedByName,varchar,500,YES
dbo,tbGradeLimitHd,isDeleted,bit,,NO
dbo,tbGradeLimitHistory,id,int,,NO
dbo,tbGradeLimitHistory,gradeLimitHdId,int,,YES
dbo,tbGradeLimitHistory,historyType,varchar,50,NO
dbo,tbGradeLimitHistory,status,varchar,50,NO
dbo,tbGradeLimitHistory,remark,varchar,255,YES
dbo,tbGradeLimitHistory,createdAt,datetime2,,NO
dbo,tbGradeLimitHistory,createdByName,varchar,500,YES
dbo,tbGradeLimitHistory,createdBy,varchar,50,YES
dbo,tbGradeLimitHistory,updatedAt,datetime2,,NO
dbo,tbGradeLimitHistory,updatedBy,varchar,50,YES
dbo,tbGradeLimitHistory,updatedByName,varchar,500,YES
dbo,tbGradeLimitHistory,isDeleted,bit,,NO
dbo,tbGradingDt,id,int,,NO
dbo,tbGradingDt,gradingHdId,int,,NO
dbo,tbGradingDt,grading,int,,NO
dbo,tbGradingDt,gradingName,varchar,500,YES
dbo,tbGradingDt,gradingRemark,varchar,1000,YES
dbo,tbGradingDt,scoreMin,decimal,,YES
dbo,tbGradingDt,scoreMax,decimal,,YES
dbo,tbGradingDt,isDeleted,bit,,NO
dbo,tbGradingDt,createdAt,datetime2,,NO
dbo,tbGradingDt,createdBy,varchar,36,NO
dbo,tbGradingDt,createdByName,varchar,255,NO
dbo,tbGradingDt,updatedAt,datetime2,,YES
dbo,tbGradingDt,updatedBy,varchar,36,YES
dbo,tbGradingDt,updatedByName,varchar,255,YES
dbo,tbGradingHd,id,int,,NO
dbo,tbGradingHd,yearStart,varchar,4,NO
dbo,tbGradingHd,yearEnd,varchar,4,YES
dbo,tbGradingHd,status,varchar,50,NO
dbo,tbGradingHd,usageStatus,varchar,50,NO
dbo,tbGradingHd,refReviseId,int,,YES
dbo,tbGradingHd,isDeleted,bit,,NO
dbo,tbGradingHd,createdAt,datetime2,,NO
dbo,tbGradingHd,createdBy,varchar,36,NO
dbo,tbGradingHd,createdByName,varchar,255,YES
dbo,tbGradingHd,updatedAt,datetime2,,YES
dbo,tbGradingHd,updatedBy,varchar,36,YES
dbo,tbGradingHd,updatedByName,varchar,255,YES
dbo,tbGradingHdHistory,id,int,,NO
dbo,tbGradingHdHistory,gradingHdId,int,,NO
dbo,tbGradingHdHistory,historyType,varchar,50,NO
dbo,tbGradingHdHistory,status,varchar,50,NO
dbo,tbGradingHdHistory,remark,varchar,255,NO
dbo,tbGradingHdHistory,isDeleted,bit,,NO
dbo,tbGradingHdHistory,createdAt,datetime2,,NO
dbo,tbGradingHdHistory,createdBy,varchar,36,NO
dbo,tbGradingHdHistory,createdByName,varchar,255,NO
dbo,tbGradingHdHistory,updatedAt,datetime2,,NO
dbo,tbGradingHdHistory,updatedBy,varchar,50,YES
dbo,tbGradingHdHistory,updatedByName,varchar,500,YES
dbo,tbIndicatorDt,id,int,,NO
dbo,tbIndicatorDt,indicatorHdId,int,,NO
dbo,tbIndicatorDt,indicatorName,varchar,500,NO
dbo,tbIndicatorDt,indicatorRemark,varchar,1000,YES
dbo,tbIndicatorDt,isDeleted,bit,,NO
dbo,tbIndicatorDt,createdAt,datetime2,,NO
dbo,tbIndicatorDt,createdBy,varchar,36,NO
dbo,tbIndicatorDt,createdByName,varchar,255,YES
dbo,tbIndicatorDt,updatedAt,datetime2,,YES
dbo,tbIndicatorDt,updatedBy,varchar,36,YES
dbo,tbIndicatorDt,updatedByName,varchar,255,YES
dbo,tbIndicatorHd,id,int,,NO
dbo,tbIndicatorHd,indicatorTypeId,int,,YES
dbo,tbIndicatorHd,yearStart,varchar,10,NO
dbo,tbIndicatorHd,yearEnd,varchar,10,YES
dbo,tbIndicatorHd,status,varchar,50,NO
dbo,tbIndicatorHd,usageStatus,varchar,50,NO
dbo,tbIndicatorHd,refReviseId,int,,YES
dbo,tbIndicatorHd,isDeleted,bit,,NO
dbo,tbIndicatorHd,createdAt,datetime2,,NO
dbo,tbIndicatorHd,createdBy,varchar,36,NO
dbo,tbIndicatorHd,createdByName,varchar,255,YES
dbo,tbIndicatorHd,updatedAt,datetime2,,YES
dbo,tbIndicatorHd,updatedBy,varchar,36,YES
dbo,tbIndicatorHd,updatedByName,varchar,255,YES
dbo,tbIndicatorHdHistory,id,int,,NO
dbo,tbIndicatorHdHistory,indicatorHdId,int,,NO
dbo,tbIndicatorHdHistory,historyType,varchar,50,NO
dbo,tbIndicatorHdHistory,status,varchar,50,YES
dbo,tbIndicatorHdHistory,remark,varchar,255,NO
dbo,tbIndicatorHdHistory,createdAt,datetime2,,NO
dbo,tbIndicatorHdHistory,createdBy,varchar,36,NO
dbo,tbIndicatorHdHistory,createdByName,varchar,255,YES
dbo,tbIndicatorHdHistory,updatedAt,datetime2,,YES
dbo,tbIndicatorHdHistory,updatedBy,varchar,36,YES
dbo,tbIndicatorHdHistory,updatedByName,varchar,255,YES
dbo,tbIndicatorHdHistory,isdeleted,bit,,NO
dbo,tbIndicatorType,id,int,,NO
dbo,tbIndicatorType,indicatorTypeCode,varchar,50,NO
dbo,tbIndicatorType,indicatorTypeName,varchar,255,NO
dbo,tbIndicatorType,indicatorTypeDescription,varchar,500,NO
dbo,tbIndicatorType,indicatorForm,varchar,50,NO
dbo,tbIndicatorType,yearStart,varchar,10,NO
dbo,tbIndicatorType,yearEnd,varchar,10,YES
dbo,tbIndicatorType,status,varchar,50,NO
dbo,tbIndicatorType,usageStatus,varchar,50,NO
dbo,tbIndicatorType,refReviseId,int,,YES
dbo,tbIndicatorType,createdAt,datetime2,,NO
dbo,tbIndicatorType,createdByName,varchar,500,YES
dbo,tbIndicatorType,createdBy,varchar,50,YES
dbo,tbIndicatorType,updatedAt,datetime2,,NO
dbo,tbIndicatorType,updatedBy,varchar,50,YES
dbo,tbIndicatorType,updatedByName,varchar,500,YES
dbo,tbIndicatorType,isDeleted,bit,,NO
dbo,tbIndicatorTypeHistory,id,int,,NO
dbo,tbIndicatorTypeHistory,indicatorTypeId,int,,YES
dbo,tbIndicatorTypeHistory,historyType,varchar,50,NO
dbo,tbIndicatorTypeHistory,status,varchar,50,NO
dbo,tbIndicatorTypeHistory,remark,varchar,255,YES
dbo,tbIndicatorTypeHistory,createdAt,datetime2,,NO
dbo,tbIndicatorTypeHistory,createdByName,varchar,500,YES
dbo,tbIndicatorTypeHistory,createdBy,varchar,50,YES
dbo,tbIndicatorTypeHistory,updatedAt,datetime2,,NO
dbo,tbIndicatorTypeHistory,updatedBy,varchar,50,YES
dbo,tbIndicatorTypeHistory,updatedByName,varchar,500,YES
dbo,tbIndicatorTypeHistory,isDeleted,bit,,NO
dbo,tbIndicatorWeightDt,id,int,,NO
dbo,tbIndicatorWeightDt,indicatorWeightHdId,int,,NO
dbo,tbIndicatorWeightDt,indicatorTypeId,int,,NO
dbo,tbIndicatorWeightDt,weight,int,,NO
dbo,tbIndicatorWeightDt,createdAt,datetime2,,NO
dbo,tbIndicatorWeightDt,createdByName,varchar,500,YES
dbo,tbIndicatorWeightDt,createdBy,varchar,50,YES
dbo,tbIndicatorWeightDt,updatedAt,datetime2,,NO
dbo,tbIndicatorWeightDt,updatedBy,varchar,50,YES
dbo,tbIndicatorWeightDt,updatedByName,varchar,500,YES
dbo,tbIndicatorWeightDt,isDeleted,bit,,NO
dbo,tbIndicatorWeightHd,id,int,,NO
dbo,tbIndicatorWeightHd,employeeGroup,varchar,255,NO
dbo,tbIndicatorWeightHd,empLevelFromId,varchar,36,NO
dbo,tbIndicatorWeightHd,empLevelToId,varchar,36,NO
dbo,tbIndicatorWeightHd,empLevelFrom,int,,NO
dbo,tbIndicatorWeightHd,empLevelTo,int,,NO
dbo,tbIndicatorWeightHd,totalWeight,int,,NO
dbo,tbIndicatorWeightHd,yearStart,varchar,10,NO
dbo,tbIndicatorWeightHd,yearEnd,varchar,10,YES
dbo,tbIndicatorWeightHd,status,varchar,50,NO
dbo,tbIndicatorWeightHd,usageStatus,varchar,50,NO
dbo,tbIndicatorWeightHd,refReviseId,int,,YES
dbo,tbIndicatorWeightHd,createdAt,datetime2,,NO
dbo,tbIndicatorWeightHd,createdByName,varchar,500,YES
dbo,tbIndicatorWeightHd,createdBy,varchar,50,YES
dbo,tbIndicatorWeightHd,updatedAt,datetime2,,NO
dbo,tbIndicatorWeightHd,updatedBy,varchar,50,YES
dbo,tbIndicatorWeightHd,updatedByName,varchar,500,YES
dbo,tbIndicatorWeightHd,isDeleted,bit,,NO
dbo,tbIndicatorWeightHistory,id,int,,NO
dbo,tbIndicatorWeightHistory,indicatorWeightHdId,int,,YES
dbo,tbIndicatorWeightHistory,historyType,varchar,50,NO
dbo,tbIndicatorWeightHistory,status,varchar,50,NO
dbo,tbIndicatorWeightHistory,remark,varchar,255,YES
dbo,tbIndicatorWeightHistory,createdAt,datetime2,,NO
dbo,tbIndicatorWeightHistory,createdByName,varchar,500,YES
dbo,tbIndicatorWeightHistory,createdBy,varchar,50,YES
dbo,tbIndicatorWeightHistory,updatedAt,datetime2,,NO
dbo,tbIndicatorWeightHistory,updatedBy,varchar,50,YES
dbo,tbIndicatorWeightHistory,updatedByName,varchar,500,YES
dbo,tbIndicatorWeightHistory,isDeleted,bit,,NO
dbo,tbPeriod,id,int,,NO
dbo,tbPeriod,fiscalYear,varchar,10,NO
dbo,tbPeriod,fiscalYearStart,date,,NO
dbo,tbPeriod,fiscalYearEnd,date,,NO
dbo,tbPeriod,settingGoalStart,date,,YES
dbo,tbPeriod,settingGoalEnd,date,,YES
dbo,tbPeriod,settingGoalSubmit,date,,YES
dbo,tbPeriod,checkDataStart,date,,YES
dbo,tbPeriod,checkDataEnd,date,,YES
dbo,tbPeriod,updateResultStart,date,,YES
dbo,tbPeriod,updateResultEnd,date,,YES
dbo,tbPeriod,evaluationStart,date,,YES
dbo,tbPeriod,evaluationEnd,date,,YES
dbo,tbPeriod,feedbackStart,date,,YES
dbo,tbPeriod,feedbackEnd,date,,YES
dbo,tbPeriod,maximumStartdate,date,,YES
dbo,tbPeriod,status,varchar,50,NO
dbo,tbPeriod,isInactive,bit,,NO
dbo,tbPeriod,isDeleted,bit,,NO
dbo,tbPeriod,createdAt,datetime2,,NO
dbo,tbPeriod,createdBy,varchar,36,NO
dbo,tbPeriod,createdByName,varchar,255,YES
dbo,tbPeriod,updatedAt,datetime2,,YES
dbo,tbPeriod,updatedBy,varchar,36,YES
dbo,tbPeriod,updatedByName,varchar,255,YES
dbo,tbPeriodExtend,id,int,,NO
dbo,tbPeriodExtend,fiscalYear,varchar,10,YES
dbo,tbPeriodExtend,PMSPeriodId,int,,NO
dbo,tbPeriodExtend,settingGoalStartExtend,date,,YES
dbo,tbPeriodExtend,settingGoalEndExtend,date,,YES
dbo,tbPeriodExtend,buId,varchar,36,NO
dbo,tbPeriodExtend,buName,varchar,1000,YES
dbo,tbPeriodExtend,extendRemark,varchar,1000,YES
dbo,tbPeriodExtend,createdAt,datetime2,,NO
dbo,tbPeriodExtend,createdBy,varchar,36,NO
dbo,tbPeriodExtend,createdByName,varchar,255,YES
dbo,tbPeriodExtend,updatedAt,datetime2,,NO
dbo,tbPeriodExtend,updatedBy,varchar,50,YES
dbo,tbPeriodExtend,updatedByName,varchar,500,YES
dbo,tbPeriodExtend,isDeleted,bit,,NO
dbo,tbPeriodHistory,id,int,,NO
dbo,tbPeriodHistory,PMSPeriodId,int,,YES
dbo,tbPeriodHistory,historyType,varchar,50,YES
dbo,tbPeriodHistory,status,varchar,50,YES
dbo,tbPeriodHistory,remark,varchar,255,YES
dbo,tbPeriodHistory,createdAt,datetime2,,NO
dbo,tbPeriodHistory,createdBy,varchar,36,NO
dbo,tbPeriodHistory,createdByName,varchar,255,YES
dbo,tbPeriodHistory,updatedAt,datetime2,,NO
dbo,tbPeriodHistory,updatedBy,varchar,50,YES
dbo,tbPeriodHistory,updatedByName,varchar,500,YES
dbo,tbPeriodHistory,isDeleted,bit,,NO
dbo,tbPMSUser,id,int,,NO
dbo,tbPMSUser,wfEmpId,varchar,36,NO
dbo,tbPMSUser,refEmpId,varchar,36,YES
dbo,tbPMSUser,isDeleted,bit,,NO
dbo,tbPMSUser,createdAt,datetime2,,NO
dbo,tbPMSUser,createdBy,varchar,36,NO
dbo,tbPMSUser,createdByName,varchar,255,YES
dbo,tbPMSUser,updatedAt,datetime2,,YES
dbo,tbPMSUser,updatedBy,varchar,36,YES
dbo,tbPMSUser,updatedByName,varchar,255,YES
dbo,tbPMSUser,empCode,varchar,50,YES
dbo,tbPMSUser,manpowerNo,varchar,50,YES
dbo,tbPMSUser,title,varchar,100,YES
dbo,tbPMSUser,firstName,varchar,1000,YES
dbo,tbPMSUser,middleName,varchar,1000,YES
dbo,tbPMSUser,lastName,varchar,1000,YES
dbo,tbPMSUser,nickName,varchar,1000,YES
dbo,tbPMSUser,identityCard,varchar,17,YES
dbo,tbPMSUser,gender,varchar,50,YES
dbo,tbPMSUser,email,varchar,255,YES
dbo,tbPMSUser,employmentTypeId,varchar,36,YES
dbo,tbPMSUser,employmentTypeCode,varchar,50,YES
dbo,tbPMSUser,employmentTypeName,varchar,1000,YES
dbo,tbPMSUser,workingStatus,varchar,255,YES
dbo,tbPMSUser,reportToId,varchar,36,YES
dbo,tbPMSUser,reportToCode,varchar,36,YES
dbo,tbPMSUser,reportTotitle,varchar,100,YES
dbo,tbPMSUser,reportTofirstName,varchar,1000,YES
dbo,tbPMSUser,reportTomiddleName,varchar,1000,YES
dbo,tbPMSUser,reportTolastName,varchar,1000,YES
dbo,tbPMSUser,buId,varchar,36,YES
dbo,tbPMSUser,buCode,varchar,50,YES
dbo,tbPMSUser,buName,varchar,1000,YES
dbo,tbPMSUser,divisionId,varchar,36,YES
dbo,tbPMSUser,divisionCode,varchar,50,YES
dbo,tbPMSUser,divisionName,varchar,1000,YES
dbo,tbPMSUser,otherId,varchar,36,YES
dbo,tbPMSUser,otherCode,varchar,50,YES
dbo,tbPMSUser,otherName,varchar,1000,YES
dbo,tbPMSUser,orgUnitId,varchar,36,YES
dbo,tbPMSUser,orgUnitCode,varchar,50,YES
dbo,tbPMSUser,orgUnitName,varchar,1000,YES
dbo,tbPMSUser,positionId,varchar,36,YES
dbo,tbPMSUser,posCareerId,varchar,36,YES
dbo,tbPMSUser,posCareerCode,varchar,50,YES
dbo,tbPMSUser,posCareerName,varchar,1000,YES
dbo,tbPMSUser,posManageId,varchar,36,YES
dbo,tbPMSUser,posManageCode,varchar,50,YES
dbo,tbPMSUser,posManageName,varchar,1000,YES
dbo,tbPMSUser,posTechnicalId,varchar,36,YES
dbo,tbPMSUser,posTechnicalCode,varchar,50,YES
dbo,tbPMSUser,posTechnicalName,varchar,1000,YES
dbo,tbPMSUser,orgId,varchar,36,YES
dbo,tbPMSUser,departmentId,varchar,36,YES
dbo,tbPMSUser,departmentCode,varchar,50,YES
dbo,tbPMSUser,departmentName,varchar,1000,YES
dbo,tbPMSUser,employeeLevelId,varchar,36,YES
dbo,tbPMSUser,employeeLevelCode,varchar,50,YES
dbo,tbPMSUser,employeeLevelName,varchar,1000,YES
dbo,tbPMSUser,startDate,datetime2,,YES
dbo,tbPMSUser,workingDate,datetime2,,YES
dbo,tbPMSUser,birthdate,datetime2,,YES
dbo,tbPMSUser,employDate,datetime2,,YES
dbo,tbPMSUser,SourceDB,varchar,50,YES
dbo,tbPMSUser,resignationType,varchar,100,YES
dbo,tbPMSUser,resignReason,varchar,1000,YES
dbo,tbPMSUser,isResign,bit,,NO
dbo,tbPMSUser,isRetire,bit,,NO
dbo,tbPMSUser,pmsPermission,varchar,1000,NO
dbo,tbPMSUserDepAdmin,id,int,,NO
dbo,tbPMSUserDepAdmin,permissionUserId,int,,NO
dbo,tbPMSUserDepAdmin,wfEmpId,varchar,36,NO
dbo,tbPMSUserDepAdmin,refEmpId,varchar,36,NO
dbo,tbPMSUserDepAdmin,wfOrgUnitId,varchar,36,NO
dbo,tbPMSUserDepAdmin,orgUnitCode,varchar,50,NO
dbo,tbPMSUserDepAdmin,orgUnitName,varchar,1000,NO
dbo,tbPMSUserDepAdmin,isDeleted,bit,,NO
dbo,tbPMSUserDepAdmin,createdAt,datetime2,,NO
dbo,tbPMSUserDepAdmin,createdBy,varchar,36,NO
dbo,tbPMSUserDepAdmin,createdByName,varchar,255,YES
dbo,tbPMSUserDepAdmin,updatedAt,datetime2,,YES
dbo,tbPMSUserDepAdmin,updatedBy,varchar,36,YES
dbo,tbPMSUserDepAdmin,updatedByName,varchar,255,YES
dbo,tbPMSUserDepAdmin,remark,varchar,1000,YES
dbo,tbPMSUserHistory,id,int,,NO
dbo,tbPMSUserHistory,pmsUserId,int,,NO
dbo,tbPMSUserHistory,historyType,varchar,50,NO
dbo,tbPMSUserHistory,remark,varchar,1000,NO
dbo,tbPMSUserHistory,isDeleted,bit,,NO
dbo,tbPMSUserHistory,createdAt,datetime2,,NO
dbo,tbPMSUserHistory,createdBy,varchar,36,NO
dbo,tbPMSUserHistory,createdByName,varchar,255,YES
dbo,tbPMSUserHistory,updatedAt,datetime2,,YES
dbo,tbPMSUserHistory,updatedBy,varchar,36,YES
dbo,tbPMSUserHistory,updatedByName,varchar,255,YES
dbo,tbRatingScale,id,int,,NO
dbo,tbRatingScale,rating,int,,NO
dbo,tbRatingScale,ratingName,varchar,500,NO
dbo,tbRatingScale,ratingRemark,varchar,1000,NO
dbo,tbRatingScale,indicatorTypeId,int,,YES
dbo,tbRatingScale,yearStart,varchar,10,NO
dbo,tbRatingScale,yearEnd,varchar,10,YES
dbo,tbRatingScale,status,varchar,50,NO
dbo,tbRatingScale,usageStatus,varchar,50,NO
dbo,tbRatingScale,refReviseId,int,,YES
dbo,tbRatingScale,createdAt,datetime2,,NO
dbo,tbRatingScale,createdByName,varchar,500,YES
dbo,tbRatingScale,createdBy,varchar,50,YES
dbo,tbRatingScale,updatedAt,datetime2,,NO
dbo,tbRatingScale,updatedBy,varchar,50,YES
dbo,tbRatingScale,updatedByName,varchar,500,YES
dbo,tbRatingScale,isDeleted,bit,,NO
dbo,tbRatingScaleHistory,id,int,,NO
dbo,tbRatingScaleHistory,ratingId,int,,YES
dbo,tbRatingScaleHistory,historyType,varchar,50,NO
dbo,tbRatingScaleHistory,status,varchar,50,NO
dbo,tbRatingScaleHistory,remark,varchar,255,YES
dbo,tbRatingScaleHistory,createdAt,datetime2,,NO
dbo,tbRatingScaleHistory,createdByName,varchar,500,YES
dbo,tbRatingScaleHistory,createdBy,varchar,50,YES
dbo,tbRatingScaleHistory,updatedAt,datetime2,,NO
dbo,tbRatingScaleHistory,updatedBy,varchar,50,YES
dbo,tbRatingScaleHistory,updatedByName,varchar,500,YES
dbo,tbRatingScaleHistory,isDeleted,bit,,NO
`