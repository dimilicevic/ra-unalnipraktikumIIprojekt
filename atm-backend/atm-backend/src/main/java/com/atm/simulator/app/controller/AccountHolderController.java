package com.atm.simulator.app.controller;

import com.atm.simulator.app.dto.AccountHolderDTO;
import com.atm.simulator.app.model.AccountHolder;
import com.atm.simulator.app.response.GenericResponse;
import com.atm.simulator.app.service.AccountHolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/accounts")
@CrossOrigin
public class AccountHolderController {
    @Autowired
    private AccountHolderService accountHolderService;

    @PostMapping("/authentication")
    public GenericResponse authenticateCustomerByPINCode(@RequestBody AccountHolderDTO accountHolderDTO){
        AccountHolder accountHolderByCardNumber = accountHolderService.findByCardNumber(accountHolderDTO.getCardNumber());
        if(accountHolderByCardNumber == null)
            return new GenericResponse("Failure", "Card number not found");
        AccountHolder accountHolderByCardNumberAndPinCode = accountHolderService.findByCardNumberAndPinCode(accountHolderDTO.getCardNumber(), accountHolderDTO.getPinCode());
        if(accountHolderByCardNumberAndPinCode == null)
            return new GenericResponse("Failure", "Incorrect PIN entered");
        return new GenericResponse("Success", "Success", accountHolderByCardNumberAndPinCode);
    }

    @PostMapping("/withdrawal/{withdrawalAmount}")
    public GenericResponse withdraw(@RequestBody AccountHolderDTO accountHolderDTO, @PathVariable("withdrawalAmount") Double withdrawalAmount){
        // Check accountNumber is not null
        Long accountNumber = accountHolderDTO.getAccountNumber();
        if(accountNumber != null){
            boolean withdrawalStatus = accountHolderService.withdraw(accountNumber, withdrawalAmount);
            if(withdrawalStatus){
                System.out.println("Amount of $"+withdrawalAmount+" has been successfully withdrawn from your account "+accountNumber);
                // Get the account details with updated balance
                AccountHolder byAccountNumber = accountHolderService.findByAccountNumber(accountNumber);
                return new GenericResponse("Success", "Amount of $"+withdrawalAmount+" has been successfully withdrawn from your account "+accountNumber, byAccountNumber);
            }
            System.out.println("Unable to withdraw from account "+accountNumber);
            return new GenericResponse("Failure", "Withdrawal failed");
        }
        System.out.println("Account number does not exist");
        return new GenericResponse("Failure", "Account number does not exist");
    }

    @GetMapping("/{accountNumber}")
    public GenericResponse getAccountHolderDetailsByAccountNumber(@PathVariable("accountNumber") Long accountNumber){
        AccountHolder accountHolder = accountHolderService.findByAccountNumber(accountNumber);
        if(accountHolder != null){
            System.out.println("Fetching account details by account number "+ accountNumber);
            return new GenericResponse("Success", "Account details retrieved", accountHolder);
        }
        return new GenericResponse("Failure", "No such account found against [", accountHolder+"] account number");
    }

    @PostMapping("/disableAccount")
    public GenericResponse disableAccount(@RequestBody AccountHolderDTO accountHolderDTO){
        boolean status = accountHolderService.disableCardByCardNumber(accountHolderDTO.getCardNumber());
        if(status)
            return new GenericResponse("Success", "Your card has been blocked due to too many incorrect attempts");
        return new GenericResponse("Failure", "Unable to disable card");
    }
}
