import React from 'react'

const Loading = ({ 
  size = 'medium',
  fullScreen = false
}) => {
  // Size configurations
  const sizeClasses = {
    small: { container: 'w-8 h-8', text: 'text-base', description: 'text-sm' },
    medium: { container: 'w-12 h-12', text: 'text-lg', description: 'text-base' },
    large: { container: 'w-16 h-16', text: 'text-xl', description: 'text-lg' }
  }

  const currentSize = sizeClasses[size]

  return (
    <div className='flex mt-20 items-center justify-center max-h-screen'>
    <div 
      className={
        fullScreen 
          ? 'fixed inset-0 flex items-center justify-center bg-white z-50'
          : 'flex flex-col items-center justify-center p-8'
      }
    >
      <div className="flex flex-col items-center justify-center max-w-md text-center">
        
        {/* Animated Spinner */}
        <div className={`relative ${currentSize.container} mb-6`}>
         
          
          {/* Spinning Ring */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '4px solid transparent',
              borderTopColor: '#06b6d4',
              borderRightColor: '#06b6d4',
              animation: 'spin 1s linear infinite'
            }}
          ></div>
          
          
        </div>

       

      

       

        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
          @keyframes ping {
            75%, 100% {
              transform: scale(1.5);
              opacity: 0;
            }
          }
          @keyframes bounce {
            0%, 80%, 100% {
              transform: scale(0);
              opacity: 0.5;
            }
            40% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
    </div>
  )
}

export default Loading