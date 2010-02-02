/*
 * Copyright 2009 Hangzhou Quanshun Technology Co.,Ltd.
 *
 * All right reserved.
 */
package com.tradeserving.mywedding.guest.model;

import javax.persistence.Entity;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * @author HOLYLIN
 * @since 2009-12-22
 */
@Entity
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Guest implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	private String remark;
	private String name;
	private String isWinner;
	private String winnerType;

	public Guest() {
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "remark", length = 65535)
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Column(name = "name", length = 50)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "is_winner", length = 2)
	public String getIsWinner() {
		return isWinner;
	}

	public void setIsWinner(String isWinner) {
		this.isWinner = isWinner;
	}

	@Column(name = "winner_type", length = 20)
	public String getWinnerType() {
		return winnerType;
	}

	public void setWinnerType(String winnerType) {
		this.winnerType = winnerType;
	}

}
