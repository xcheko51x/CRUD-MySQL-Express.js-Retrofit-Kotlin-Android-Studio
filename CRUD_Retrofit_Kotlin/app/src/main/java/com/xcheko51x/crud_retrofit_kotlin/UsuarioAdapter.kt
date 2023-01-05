package com.xcheko51x.crud_retrofit_kotlin

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import androidx.recyclerview.widget.RecyclerView.ViewHolder

class UsuarioAdapter(
    var context: Context,
    var listausuarios: ArrayList<Usuario>
): RecyclerView.Adapter<UsuarioAdapter.UsuarioViewHolder>() {

    private var onClick: OnItemClicked? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): UsuarioViewHolder {
        val vista = LayoutInflater.from(parent.context).inflate(R.layout.item_rv_usuario, parent, false)
        return UsuarioViewHolder(vista)
    }

    override fun onBindViewHolder(holder: UsuarioViewHolder, position: Int) {
        val usuario = listausuarios.get(position)

        holder.tvIdUsuario.text = usuario.idUsuario.toString()
        holder.tvNombre.text = usuario.nombre
        holder.tvEmail.text = usuario.email

        holder.btnEditar.setOnClickListener {
            onClick?.editarUsuario(usuario)
        }

        holder.btnBorrar.setOnClickListener {
            onClick?.borrarUsuario(usuario.idUsuario)
        }
    }

    override fun getItemCount(): Int {
        return listausuarios.size
    }

    inner class UsuarioViewHolder(itemView: View): ViewHolder(itemView) {
        val tvIdUsuario = itemView.findViewById(R.id.tvIdUsuario) as TextView
        val tvNombre = itemView.findViewById(R.id.tvNombre) as TextView
        val tvEmail = itemView.findViewById(R.id.tvEmail) as TextView
        val btnEditar = itemView.findViewById(R.id.btnEditar) as Button
        val btnBorrar = itemView.findViewById(R.id.btnBorrar) as Button
    }

    interface OnItemClicked {
        fun editarUsuario(usuario: Usuario)
        fun borrarUsuario(idUsuario: Int)
    }

    fun setOnClick(onClick: OnItemClicked?) {
        this.onClick = onClick
    }

}