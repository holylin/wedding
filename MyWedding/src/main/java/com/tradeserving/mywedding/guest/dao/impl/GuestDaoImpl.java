/*
 * Copyright 2006-2009 Hangzhou Quanshun Technology Co.,Ltd.
 *
 * All right reserved.
 */
package com.tradeserving.mywedding.guest.dao.impl;

import java.util.List;

import com.tradeserving.core.json.dao.impl.GenericDaoHibernateImpl;
import com.tradeserving.mywedding.guest.dao.GuestDao;
import com.tradeserving.mywedding.guest.model.Guest;

/**
 * @author HOLYLIN
 * @since 2009-12-22
 * @version 1.0
 */

public class GuestDaoImpl extends GenericDaoHibernateImpl<Guest, Long>
		implements GuestDao {

	public GuestDaoImpl() {
		super(Guest.class);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Guest> listAvailableForLottery() {
		String hql = "from Guest guest where guest.isWinner <> 'Y' and guest.isWinner <> 'y'";

		return find(hql);
	}

}
