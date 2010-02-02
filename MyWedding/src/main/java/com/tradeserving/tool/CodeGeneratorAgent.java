/*
 * Copyright 2009 Hangzhou Software Technology Co.,Ltd.
 *
 * All right reserved.
 */
package com.tradeserving.tool;

/**
 * @author holylin
 * @since 2009-07-12
 */

public class CodeGeneratorAgent {

	private CodeGeneratorAgent() {

	}

	public static void main(String[] args) {

		CodeGenerator codeGenerator = new CodeGenerator();

		codeGenerator.generateAll(args[0], args[1]);

	}
}
