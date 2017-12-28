export class ChessEvent
{
	messageObject = null;
	_defaultPervented = false;
	_shouldPropagate = true;

	preventDefault()
	{
		this._defaultPervented = true;
	}

	isPrevented()
	{
		return this._defaultPervented;
	}

	trigger()
	{
		if(this.messageObject)
		{
			this.messageObject();
		}
	}

	stopPropagation()
	{
		this._shouldPropagate = false;
	}

	shouldPropagate():boolean
	{
		return this._shouldPropagate;
	}
};

export class ChessEventEmitter
{
	listeners = [];
	emit(event, messageObject=null)
	{
		event.messageObject = messageObject;
		this.listeners.forEach(callback => {
			
			if(event.shouldPropagate())
			{
				callback(event);
			}
		});
	}

	broadcast(messsage)
	{
		this.listeners.forEach(callback => {
			callback(event);
		});
	}
	
	on(callback)
	{
		this.listeners.push(callback);
	}

	off(callback)
	{
		this.listeners.splice(this.listeners.indexOf(callback), 1);
	}
};