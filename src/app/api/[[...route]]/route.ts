import { httpHandler } from "@/server"

// Change this from "edge" to "nodejs"
export const runtime = "nodejs"

// Add a config to specify larger size if needed
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Adjust as needed
    },
  },
}

export { httpHandler as GET, httpHandler as POST }