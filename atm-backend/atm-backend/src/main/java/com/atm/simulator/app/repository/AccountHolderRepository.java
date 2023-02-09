package com.atm.simulator.app.repository;

import com.atm.simulator.app.model.AccountHolder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountHolderRepository extends JpaRepository<AccountHolder, Long> {
    AccountHolder findByPinCode(Long pin);

    AccountHolder findByAccountNumber(Long accountNumber);

    AccountHolder findByCardNumber(Long cardNumber);

    AccountHolder findByCardNumberAndPinCode(Long cardNumber, Long pin);
}
