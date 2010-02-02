/*
 * Copyright 2006-2008 Hangzhou Quanshun Technology Co.,Ltd.
 *
 * All right reserved.
 */
package com.tradeserving.tool;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Properties;
import org.apache.commons.io.FileUtils;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;
import org.apache.velocity.app.VelocityEngine;

/**
 * @author holylin
 * @since 2009-07-12
 */

public class CodeGenerator {

	@SuppressWarnings("unused")
	private String packagePartName = null;
	private VelocityContext mainContext = null;
	private Template mainTemplate = null;
	private Properties p = new Properties();
	private VelocityEngine engine = new VelocityEngine();
	private SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
	@SuppressWarnings("unused")
	private String pojoName = null;

	// : 项目路径参数
	private static final String PROJECT_BUILD_ROOT_FILE_PATH = Thread
			.currentThread().getContextClassLoader().getResource("").getFile();
	private static final String PROJECT_NAME = PROJECT_BUILD_ROOT_FILE_PATH
			.split("/")[PROJECT_BUILD_ROOT_FILE_PATH.split("/").length - 3];
	private static final String GENERATE_JAVA_CODE_FILE_ROOT_DIRECTORY = PROJECT_BUILD_ROOT_FILE_PATH
			+ "../../src/main/java/com/tradeserving/"
			+ PROJECT_NAME.toLowerCase();
	private static final String GENERATE_JS_CODE_FILE_ROOT_DIRECTORY = Thread
			.currentThread().getContextClassLoader().getResource("").getFile()
			+ "../../src/main/webapp/pages/business";
	private static final String GENERATE_WEBAPP_FILE_ROOT_DIRECTORY = Thread
			.currentThread().getContextClassLoader().getResource("").getFile()
			+ "../../src/main/webapp";
	private static final String GENERATE_RESOURCES_FILE_ROOT_DIRECTORY = Thread
			.currentThread().getContextClassLoader().getResource("").getFile()
			+ "../../src/main/resources";

	private static final String PACKAGE_PREFIX = "com.tradeserving."
			+ PROJECT_NAME.toLowerCase() + ".";
	private static final String AUTHOR = System.getenv().get("COMPUTERNAME");

	// :~

	public CodeGenerator() {

		// ：得到模板文件所在的文件夹路径
		String currentClassPath = Thread.currentThread()
				.getContextClassLoader().getResource("").getFile();
		String vmDirPath = currentClassPath
				+ this.getClass().getPackage().getName().replaceAll("\\.", "/");
		// :~

		// :初始化Velocity引擎
		p.setProperty(Velocity.FILE_RESOURCE_LOADER_PATH, vmDirPath);
		p.setProperty(Velocity.INPUT_ENCODING, "utf-8");
		p.setProperty(Velocity.OUTPUT_ENCODING, "utf-8");
		try {
			engine.init(p);
		} catch (Exception e) {
			System.out.println("初始化Velocity引擎出现错误！原因：" + e.getMessage());
		}
		// :~

		// : 初始化项目根目录
		File file = new File(GENERATE_JAVA_CODE_FILE_ROOT_DIRECTORY);
		if (!file.exists()) {
			if (file.mkdirs())
				System.out.println("Generate  root directory("
						+ GENERATE_JAVA_CODE_FILE_ROOT_DIRECTORY
						+ ") successfully!");
		}
		// :~

		// : 修改spring mvc、logback和applicationContext.xml配置文件里的有关项目名的信息
		File springMvcFile = new File(GENERATE_WEBAPP_FILE_ROOT_DIRECTORY
				+ "/WEB-INF/springMVC-servlet.xml");
		String springMvcFileContent;
		try {
			springMvcFileContent = FileUtils.readFileToString(springMvcFile);

			springMvcFileContent = springMvcFileContent.replaceAll(
					"yourproject", PROJECT_NAME.toLowerCase());
			FileUtils.writeStringToFile(springMvcFile, springMvcFileContent);

			File logbackFile = new File(GENERATE_RESOURCES_FILE_ROOT_DIRECTORY
					+ "/logback.xml");
			String logbackFileContent = FileUtils.readFileToString(logbackFile);
			logbackFileContent = logbackFileContent.replaceAll("yourproject",
					PROJECT_NAME.toLowerCase());
			FileUtils.writeStringToFile(logbackFile, logbackFileContent);

			File springFile = new File(
					GENERATE_RESOURCES_FILE_ROOT_DIRECTORY
							+ "/spring/applicationContext.xml");
			String springFileContent = FileUtils
					.readFileToString(springFile);
			springFileContent = springFileContent
					.replaceAll("yourproject", PROJECT_NAME.toLowerCase());
			FileUtils.writeStringToFile(springFile,
					springFileContent);

		} catch (IOException e) {
			System.out
					.println("修改spring mvc、logback和applicationContext.xml配置文件里的有关项目名的信息失败！可能原因："
							+ e.getMessage());
		}
	}

	private void addToContext(String key, Object value) {
		if (mainContext == null)
			mainContext = new VelocityContext();
		mainContext.put(key, value);
	}

	private void generateDirectory(String packageDestFilePath) {

		File packageDestFile = new File(packageDestFilePath);
		if (!packageDestFile.exists()) {
			if (packageDestFile.mkdirs())
				System.out.println("Generate  directory(" + packageDestFilePath
						+ ") successfully!");
		}
	}

	private void generateCodeToFile(String templateFile, String codeDestFilePath) {

		try {
			mainTemplate = engine.getTemplate(templateFile);

			File codeDestFile = new File(codeDestFilePath);
			BufferedWriter writer;
			writer = new BufferedWriter(new FileWriter(codeDestFile));
			if (mainTemplate != null)
				mainTemplate.merge(mainContext, writer);
			writer.flush();
			writer.close();

			System.out.println("Generate  file(" + codeDestFilePath
					+ ") successfully!");

		} catch (Exception e) {
			System.out.println("Error processing  template file: "
					+ templateFile + ".");
			System.out.println(e.getMessage());
		}

	}

	private void fillCodeIntoFile(String templateFile, String destString,
			String Suffix, String codeDestFilePath) {

		try {
			mainTemplate = engine.getTemplate(templateFile);
			// String tempDir = System.getProperty("java.io.tmpdir");

			String tempFilePath = "c:/templateFile.txt";
			File tempFile = new File(tempFilePath);
			BufferedWriter writer;
			writer = new BufferedWriter(new FileWriter(tempFilePath));
			if (mainTemplate != null)
				mainTemplate.merge(mainContext, writer);
			writer.flush();
			writer.close();

			String tempFileString = FileUtils.readFileToString(tempFile);
			File codeDestFile = new File(codeDestFilePath);
			String codeDestFileContent = FileUtils
					.readFileToString(codeDestFile);
			codeDestFileContent = codeDestFileContent.replaceAll(
					tempFileString, "");
			codeDestFileContent = codeDestFileContent.replaceAll(destString,
					tempFileString + Suffix);
			FileUtils.writeStringToFile(codeDestFile, codeDestFileContent);

			FileUtils.deleteQuietly(tempFile);

			System.out.println("fill  file(" + codeDestFilePath
					+ ") successfully!");

		} catch (Exception e) {
			System.out.println("Error processing  template file: "
					+ templateFile + ".");
			System.out.println(e.getMessage());
		}

	}

	public void generateAll(String packagePartName, String pojoName) {

		this.packagePartName = packagePartName;
		this.pojoName = pojoName;
		String lowerCasePojoName = pojoName.substring(0, 1).toLowerCase()
				+ pojoName.substring(1);
		Calendar today = Calendar.getInstance();

		// ：初始化velocity变量
		addToContext("Date", format.format(today.getTime()));
		addToContext("Year", today.get(Calendar.YEAR));
		addToContext("author", AUTHOR);

		addToContext("PojoDaoPackage", PACKAGE_PREFIX + packagePartName
				+ ".dao");
		addToContext("PojoClasspath", PACKAGE_PREFIX + packagePartName
				+ ".model." + pojoName);
		addToContext("Date", format.format(new java.util.Date()));
		addToContext("PojoDao", pojoName + "Dao");
		addToContext("Pojo", pojoName);

		addToContext("PojoPackage", PACKAGE_PREFIX + packagePartName + ".model");

		addToContext("PojoDaoImplPackage", PACKAGE_PREFIX + packagePartName
				+ ".dao.impl");
		addToContext("PojoDaoClasspath", PACKAGE_PREFIX + packagePartName
				+ ".dao." + pojoName + "Dao");
		addToContext("PojoDaoImpl", pojoName + "DaoImpl");
		addToContext("Pojoclass", pojoName + ".class");

		addToContext("PojoServicePackage", PACKAGE_PREFIX + packagePartName
				+ ".service");
		addToContext("PojoManager", pojoName + "Manager");

		addToContext("PojoServiceImplPackage", PACKAGE_PREFIX + packagePartName
				+ ".service.impl");
		addToContext("PojoServiceClasspath", PACKAGE_PREFIX + packagePartName
				+ ".service." + pojoName + "Manager");
		addToContext("PojoManagerImpl", pojoName + "ManagerImpl");
		addToContext("pojo", lowerCasePojoName);
		addToContext("pojoDao", lowerCasePojoName + "Dao");
		addToContext("pojoDaoDotpagedQuery", lowerCasePojoName
				+ "Dao.pagedQuery");
		addToContext("pojoDaoDotsave", lowerCasePojoName + "Dao.save");
		addToContext("pojoDaoDotremove", lowerCasePojoName + "Dao.remove");

		addToContext("PojoControlPackage", PACKAGE_PREFIX + packagePartName
				+ ".web");
		addToContext("PojoManagerClasspath", PACKAGE_PREFIX + packagePartName
				+ ".service." + pojoName + "Manager");

		addToContext("pojoDotdo", lowerCasePojoName + ".do");
		addToContext("PojoControl", pojoName + "Control");
		addToContext("pojoManager", lowerCasePojoName + "Manager");

		addToContext("pojoManagerDotwriteJsonOfModelForPage", lowerCasePojoName
				+ "Manager.writeJsonOfModelForPage");
		addToContext("pojoManagerDotsaveOrUpdateModelByJsonData",
				lowerCasePojoName + "Manager.saveOrUpdateModelByJsonData");
		addToContext("pojoManagerDotdeleteByIds", lowerCasePojoName
				+ "Manager.deleteByIds");

		addToContext("pojoDaoImpl", lowerCasePojoName + "DaoImpl");
		addToContext("PojoDaoImplClasspath", PACKAGE_PREFIX + packagePartName
				+ ".dao.impl." + pojoName + "DaoImpl");
		addToContext("PojoManagerImplClasspath", PACKAGE_PREFIX
				+ packagePartName + ".service.impl." + pojoName + "ManagerImpl");
		addToContext("PojoManagerImplClasspath", PACKAGE_PREFIX
				+ packagePartName + ".service.impl." + pojoName + "ManagerImpl");
		addToContext("PojoExt", pojoName + "Ext");
		addToContext("pojoId", lowerCasePojoName + "Id");
		addToContext("PojoExtDotJs", pojoName + "Ext.js");
		addToContext("packagePartName", packagePartName);
		addToContext("id", Math.round(Math.random() * 1000));

		// : 生成包目录
		generateDirectory(GENERATE_JAVA_CODE_FILE_ROOT_DIRECTORY + "/"
				+ packagePartName + "/model/");
		generateDirectory(GENERATE_JAVA_CODE_FILE_ROOT_DIRECTORY + "/"
				+ packagePartName + "/dao/");
		generateDirectory(GENERATE_JAVA_CODE_FILE_ROOT_DIRECTORY + "/"
				+ packagePartName + "/dao/impl/");
		generateDirectory(GENERATE_JAVA_CODE_FILE_ROOT_DIRECTORY + "/"
				+ packagePartName + "/service/");
		generateDirectory(GENERATE_JAVA_CODE_FILE_ROOT_DIRECTORY + "/"
				+ packagePartName + "/service/impl/");
		generateDirectory(GENERATE_JAVA_CODE_FILE_ROOT_DIRECTORY + "/"
				+ packagePartName + "/web/");
		generateDirectory(GENERATE_JS_CODE_FILE_ROOT_DIRECTORY + "/"
				+ packagePartName + "/js/");
		// :~

		// : 生成代码

		generateCodeToFile("pojo.vm", GENERATE_JAVA_CODE_FILE_ROOT_DIRECTORY
				+ "/" + packagePartName + "/model/" + pojoName + ".java");
		generateCodeToFile("dao.vm", GENERATE_JAVA_CODE_FILE_ROOT_DIRECTORY
				+ "/" + packagePartName + "/dao/" + pojoName + "Dao.java");
		generateCodeToFile("daoImpl.vm", GENERATE_JAVA_CODE_FILE_ROOT_DIRECTORY
				+ "/" + packagePartName + "/dao/impl/" + pojoName
				+ "DaoImpl.java");
		generateCodeToFile("service.vm", GENERATE_JAVA_CODE_FILE_ROOT_DIRECTORY
				+ "/" + packagePartName + "/service/" + pojoName
				+ "Manager.java");
		generateCodeToFile("serviceImpl.vm",
				GENERATE_JAVA_CODE_FILE_ROOT_DIRECTORY + "/" + packagePartName
						+ "/service/impl/" + pojoName + "ManagerImpl.java");
		generateCodeToFile("control.vm", GENERATE_JAVA_CODE_FILE_ROOT_DIRECTORY
				+ "/" + packagePartName + "/web/" + pojoName + "Control.java");
		generateCodeToFile("editedGridJs.vm",
				GENERATE_JS_CODE_FILE_ROOT_DIRECTORY + "/" + packagePartName
						+ "/js/" + pojoName + "Ext.js");

		fillCodeIntoFile("daoSpringBeanConfiguration.vm", "<!--FillMe-->",
				"\n\r<!--FillMe-->", GENERATE_RESOURCES_FILE_ROOT_DIRECTORY
						+ "/spring" + "/applicationContext-dao-hibernate.xml");

		fillCodeIntoFile("testJsLinkInMainJsp.vm", "<!--FillMe-->",
				"\n\r<!--FillMe-->", GENERATE_WEBAPP_FILE_ROOT_DIRECTORY
						+ "/main.jsp");

		fillCodeIntoFile("functionTree.vm", "id:'t1',leaf:true},",
				"},{id:'t1',leaf:true},", GENERATE_WEBAPP_FILE_ROOT_DIRECTORY
						+ "/functionTree.jsp");

		// :~

	}
}
