USE [file-storage]
GO

INSERT INTO [dbo].[account_holder]
           ([account_number]
           ,[account_status]
           ,[balance]
           ,[card_number]
           ,[name]
           ,[pin_code])
     VALUES
          (29451050580, 1, 10000, 4327724658799876, 'Tin Ujevic', 9733),
		  (35648040564, 1, 20000, 4244455463789975, 'Marin Drzic', 4755),
		  (42652050691, 1, 35000, 3274330669528004, 'Antun Gustav Matos', 8422),
		  (43457654184, 1, 25555, 3275430689535234, 'Kralj Tomislav', 2425)
GO


