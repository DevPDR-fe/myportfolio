
import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let chatSession: Chat | null = null;

/* 
  SECURITY NOTE (DEV PDR):
  Como esta é uma aplicação Client-Side, a API KEY é exposta no navegador.
  
  PARA PROTEGER SUA COTA (DENIAL OF WALLET):
  1. Vá ao Google Cloud Console > APIs & Services > Credentials.
  2. Edite esta API Key.
  3. Em "Application restrictions", selecione "Websites".
  4. Adicione seus domínios autorizados (ex: https://seu-portfolio.com/* e http://localhost:3000/*).
  
  Isso garante que, mesmo se a chave for roubada, ela será rejeitada pelo Google 
  se a requisição não vier do seu domínio oficial.
*/

const getAiClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// GUARDRAILS: Lista de padrões maliciosos comuns em Prompt Injection
const FORBIDDEN_PATTERNS = [
  /ignore\s+.*instruction/i,
  /ignore\s+previous/i,
  /forget\s+all/i,
  /system\s+prompt/i,
  /act\s+as/i,
  /aja\s+como/i,
  /simule/i,
  /desconsidere/i,
  /revel.*instruct/i,
  /your\s+rules/i,
  /suas\s+regras/i
];

const validateInput = (input: string): boolean => {
  return !FORBIDDEN_PATTERNS.some(pattern => pattern.test(input));
};

export const initializeChat = (): void => {
  try {
    if (!process.env.API_KEY) {
      console.warn("PDR AI: API Key não encontrada. Verifique as variáveis de ambiente.");
      return;
    }

    const ai = getAiClient();
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.5, // Temperatura mais baixa deixa a IA mais fiel às regras e menos "criativa" para alucinar
      },
    });
  } catch (error) {
    console.error("Error initializing chat:", error);
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  // 1. Client-Side Guardrail (Defesa Imediata)
  if (!validateInput(message)) {
    return "[SECURITY_ALERT] COMANDO NÃO AUTORIZADO DETECTADO. O sistema bloqueou sua solicitação por conter padrões de injeção.";
  }

  if (!chatSession) {
    initializeChat();
  }

  if (!chatSession) {
    // Verifica se o erro é falta de chave para dar uma mensagem melhor
    if (!process.env.API_KEY) {
        return "ERRO DE SISTEMA: API Key não configurada. Por favor, configure a variável API_KEY.";
    }
    return "Erro: O subsistema de IA não pôde ser inicializado. Tente recarregar a página.";
  }

  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "Sem resposta do servidor.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    const errString = error ? error.toString().toLowerCase() : "";

    // Tratamento específico para bloqueio de segurança (Domínio não autorizado)
    if (errString && (errString.includes('403') || errString.includes('permission denied'))) {
        return "ERRO DE SEGURANÇA (403): A chave de API recusou a conexão. Verifique se o domínio atual está na lista de permissões (HTTP Referrer) no Google Cloud Console.";
    }

    // Tratamento específico para API não ativada (Seu caso atual)
    if (errString && (errString.includes('not enabled') || errString.includes('enable'))) {
        return "ERRO DE CONFIGURAÇÃO: A API 'Generative Language API' não está ativada neste projeto do Google Cloud. Acesse 'APIs & Services > Library' e ative-a.";
    }

    return "Desculpe, ocorreu um erro na conexão segura. Tente novamente.";
  }
};
