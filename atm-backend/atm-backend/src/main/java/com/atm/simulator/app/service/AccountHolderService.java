package com.atm.simulator.app.service;

import com.atm.simulator.app.model.AccountHolder;
import com.atm.simulator.app.repository.AccountHolderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountHolderService {
    @Autowired
    private AccountHolderRepository accountHolderRepository;

    public AccountHolder findByPin(Long pin){
        return accountHolderRepository.findByPinCode(pin);
    }

    public Optional<AccountHolder> findById(Long id){
        return accountHolderRepository.findById(id);
    }

    public boolean withdraw(Long accountNumber, Double withdrawalAmount){
        boolean withdrawal = false;
        // Check whether account exists or not against selected account number
        if(!accountExists(accountNumber))
            return withdrawal;
        AccountHolder accountHolder = accountHolderRepository.findByAccountNumber(accountNumber);
        // Check balance is greater than withdrawal amount
        if(accountHolder.getBalance() > withdrawalAmount){
            Double updatedBalance = accountHolder.getBalance() - withdrawalAmount;
            // Update balance for the selected account holder in the database
            accountHolder.setBalance(updatedBalance);
            accountHolderRepository.save(accountHolder);
            withdrawal = true;
        }
        return withdrawal;
    }
    private boolean accountExists(Long accountNumber){
        return accountHolderRepository.findByAccountNumber(accountNumber) != null ? true: false;
    }

    public AccountHolder findByAccountNumber(Long accountNumber){
        return accountHolderRepository.findByAccountNumber(accountNumber);
    }

    public AccountHolder findByCardNumber(Long cardNumber){
        return accountHolderRepository.findByCardNumber(cardNumber);
    }
    public AccountHolder findByCardNumberAndPinCode(Long cardNumber, Long pin){
        return accountHolderRepository.findByCardNumberAndPinCode(cardNumber, pin);
    }

    public boolean disableCardByCardNumber(Long cardNumber){
        AccountHolder byCardNumber = accountHolderRepository.findByCardNumber(cardNumber);
        if(byCardNumber != null){
            byCardNumber.setAccountStatus(false);
            accountHolderRepository.save(byCardNumber);
            return true;
        }
        return false;
    }
}
