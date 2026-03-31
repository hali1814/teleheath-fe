import Image from '#/components/image'

export const FloatChatAI = () => {
  return (
    <div className="float-chat-ai fixed bottom-[100px] right-[16px] h-[52px] w-[52px]">
      <Image
        src="/chatbot.png"
        alt="chat-ai"
        className="float-chat-ai__icon h-full w-full object-cover"
      />
    </div>
  )
}
