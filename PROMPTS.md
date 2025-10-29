# PROMPTS — AI Prompt History & Context

## Overview
This document contains all **AI prompts** used during the creation of the **Telecom Experience API** project.  
It provides full transparency on how architecture, API specifications, and documentation were generated using AI assistance.

All prompts were executed with **ChatGPT (GPT-5)** during project development.

---

## 1. Architecture Design Prompt (SPEC-A)

**Prompt:**
> "Create a file `SPEC-A-architecture.md` describing the architecture, layers, and data flow between controller, service, and SalesforceCartClient in a TypeScript API project. Write it in a professional technical documentation format for GitHub."

**Goal:**  
Generate a detailed, production-style architecture description explaining design layers, responsibilities, and interactions.

**Result:**  
`SPEC-A-architecture.md` was generated, including system structure, design principles, and request flow examples.

---

## 2. API Specification Prompt (SPEC-B)

**Prompt:**
> "Create `SPEC-B-api.md` with a full REST API specification for the cart service — include all endpoints, requests, responses, status codes, error examples, and data models."

**Goal:**  
Provide a complete technical API contract similar to Swagger / OpenAPI documentation.

**Result:**  
`SPEC-B-api.md` was generated with endpoint tables, sample requests/responses, and consistent HTTP semantics.

---

## 3. README Generation Prompt

**Prompt:**
> "Generate a professional README.md for a Node.js + TypeScript project that describes architecture, setup, testing, and directory structure for a GitHub repository."

**Goal:**  
Create a polished and developer-friendly README file suitable for public repositories.

**Result:**  
A complete `README.md` file with setup instructions, project overview, and clear structure.

---

## 4. Project Setup Prompt

**Prompt:**
> "Write a step-by-step guide to create a TypeScript project using Express and Jest, with a base structure for an in-memory cart API service."

**Goal:**  
Define terminal commands and the directory structure required to initialize the project.

**Result:**  
A working TypeScript + Express boilerplate was created with `/src`, `/tests`, and build/test scripts.

---

## 5. File Creation Prompts

**Prompt Examples:**
> "Generate `SPEC-A-architecture.md` as a downloadable file."  
> "Generate `SPEC-B-api.md` as a single GitHub-ready file."  
> "Generate `README.md` with all sections for project presentation."

**Goal:**  
Automate the generation and export of `.md` files as standalone deliverables ready for commit.

**Result:**  
All documentation files were successfully generated, versioned, and included in the repository.

---

