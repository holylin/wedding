/*
 * Copyright 2006-2009 Hangzhou Quanshun Technology Co.,Ltd.
 *
 * All right reserved.
 */
package com.tradeserving.mywedding.web;

import com.tradeserving.core.service.ServiceException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import java.io.File;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author HOLYLIN
 * @since 2009-12-22
 * @version 1.0
 */
@Controller
@RequestMapping("/control.do")
public class WholeControl {
	protected final Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * 获得所有签到者图片的文件路径集合。
	 * 
	 * @author HOLYLIN
	 * @since 2009-12-22
	 */
	@RequestMapping(params = "method=getWholeSigninFilePaths")
	public String getWholeSigninFilePaths(HttpServletRequest request,
			HttpServletResponse response, ModelMap map) {
		try {
			String signInDirStr = request.getSession().getServletContext()
					.getRealPath("/signin");
			Set<String> set = new HashSet<String>();
			if (signInDirStr != null) {
				File signInDir = new File(signInDirStr);
				for (String path : signInDir.list()) {
					if (path.indexOf("jpg") != -1 || path.indexOf("png") != -1
							|| path.indexOf("gif") != -1)
						set.add(path);
				}
				map.addAttribute("signInFilePaths", set);
			}
		} catch (ServiceException e) {

			logger.error(e.getMessage(), e);
		}
		return "viewSignin.jsp";
	}

	/**
	 * 把中奖者的签名图片移到指定目录。
	 * 
	 * @author HOLYLIN
	 * @since 2010-1-10
	 */
	@RequestMapping(params = "method=moveWinnerSignPicture")
	public String moveWinnerSignPicture(HttpServletRequest request,
			HttpServletResponse response, String winnerPictureName) {
		boolean isSuccess = true;
		try {
			String signInDirStr = request.getSession().getServletContext()
					.getRealPath("/signin");
			String signWinnerDirStr = request.getSession().getServletContext()
					.getRealPath("/signin_winner");

			if (signInDirStr != null && signWinnerDirStr != null) {
				File winnerSigninFile = new File(signInDirStr + "/"
						+ winnerPictureName);
				File signWinnerDir = new File(signWinnerDirStr);
				try {
					FileUtils.copyFileToDirectory(winnerSigninFile,
							signWinnerDir);
					FileUtils.deleteQuietly(winnerSigninFile);
					logger
							.info("已把中奖者的签名图片（" + winnerPictureName
									+ "）转移到指定目录！");

				} catch (IOException e) {
					logger.error(e.getMessage(), e);
					isSuccess = false;
				}

			} else {
				if (signInDirStr == null)
					logger.error("签到图片目录为空！");
				if (signWinnerDirStr == null)
					logger.error("中奖者签到图片目录为空！");

				isSuccess = false;
			}

		} catch (ServiceException e) {

			logger.error(e.getMessage(), e);
			isSuccess = false;
		}

		try {
			response.getWriter().write("{success:" + isSuccess + "}");
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
		}
		return null;
	}

}
