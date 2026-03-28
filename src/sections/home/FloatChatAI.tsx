import Image from '#/components/image'

export const FloatChatAI = () => {
  return (
    <div className="fixed bottom-[100px] right-[16px] h-[52px] w-[52px]">
      <Image
        src="/chatbot.png"
        alt="chat-ai"
        className="h-full w-full object-cover"
      />
    </div>
  )
}
