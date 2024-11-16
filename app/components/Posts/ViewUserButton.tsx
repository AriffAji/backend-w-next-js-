"use client"

interface ViewUserButtonProps{
  userId: number
}

const ViewUserButton: React.FC<ViewUserButtonProps> = ({userId}) => {
  const handleclick = () => alert(`userId: ${userId}`);

    return (
      <>
      <button onClick={handleclick}>Lihat User</button>
      </>
    )

}

export default ViewUserButton